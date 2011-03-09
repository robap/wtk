// Copyright 2011, AUTHORS.txt. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.provide('wtk.toolbar.Toolbar');

goog.require('goog.ui.Component');
goog.require('goog.structs.Map');
goog.require('wtk.templates.toolbar');
goog.require('wtk.toolbar.MenuButton');
goog.require('wtk.util.window');
goog.require('wtk.Overlay');
goog.require('wtk.State');

/**
 * @constructor
 */
wtk.toolbar.Toolbar = function(opt_ZIndex) {
  goog.base(this);
  
  this.openState_ = wtk.State.CLOSED;
  this.buttonsAndMenus_ = new goog.structs.Map();
  this.zIndex_ = opt_ZIndex || 900;
  this.initializeMenuContainer_();
  this.initializeOverlay_();
};
goog.inherits(wtk.toolbar.Toolbar, goog.ui.Component);

/**
 * @private
 * @type {number}
 */
wtk.toolbar.Toolbar.prototype.zIndex_ = 0;

/**
 * @private
 * @type {goog.ui.Component)
 */
wtk.toolbar.Toolbar.prototype.menuContainer_ = null;

/**
 * @private
 * @type {wtk.Overlay)
 */
wtk.toolbar.Toolbar.prototype.overlay_ = null;

/**
 * @override
 */
wtk.toolbar.Toolbar.prototype.createDom = function() {
  this.element_ = goog.dom.htmlToDocumentFragment(
    wtk.templates.toolbar.getToolbarTemplate(this)
  );
};

/**
 * @override
 */
wtk.toolbar.Toolbar.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  this.connectListeners_();
};

/**
 * @override
 */
wtk.toolbar.Toolbar.prototype.exitDocument = function() {
  goog.base(this, 'exitDocument');
  this.overlay_.dispose();
  this.menuContainer_.dispose();
};

/**
 * @param {wtk.toolbar.Menu} menu
 */
wtk.toolbar.Toolbar.prototype.addMenu = function(menu) {
  menu.setZIndex(this.getZIndex());
  this.menuContainer_.addChild(menu, true);
  
  var menuButton = new wtk.toolbar.MenuButton(menu.getName(), this.getDomHelper());
  this.addChild(menuButton, true);
  
  this.buttonsAndMenus_.set(goog.getUid(menuButton), menu);
};

/**
 * @return {number}
 */
wtk.toolbar.Toolbar.prototype.getZIndex = function() {
  return this.zIndex_;
};

/**
 * @private
 */
wtk.toolbar.Toolbar.prototype.initializeMenuContainer_ = function() {
  this.menuContainer_ = new goog.ui.Component();
  this.menuContainer_.render();
};

/**
 * @private
 */
wtk.toolbar.Toolbar.prototype.initializeOverlay_ = function() {
  var winSize = wtk.util.window.getWindowBox(this.getDomHelper());
  this.overlay_ = new wtk.Overlay(winSize.right, winSize.bottom, this.zIndex_ - 1, this.getDomHelper());
  this.overlay_.setVisible(false);
  this.overlay_.render();
};

/**
 * @private
 */
wtk.toolbar.Toolbar.prototype.connectListeners_ = function() {
  goog.events.listen(this, goog.ui.Component.EventType.ACTION, this.handleAction_, false, this);
  goog.events.listen(this, goog.ui.Component.EventType.ENTER, this.handleEnterEvent_, false, this);
  goog.events.listen(this.overlay_.getElement(), goog.events.EventType.CLICK, this.hideOverlayAndMenus_, false, this);
};

/**
 * @private
 */
wtk.toolbar.Toolbar.prototype.handleAction_ = function(event) {
  var button = event.target;
  var menu = this.buttonsAndMenus_.get(goog.getUid(button));
  if(!menu) return;
  
  this.hideMenus_(menu);
  this.toggleMenu_(menu, button);
};

/**
 * @private
 */
wtk.toolbar.Toolbar.prototype.openMenu_ = function(menu) {
  this.openState_ = wtk.State.OPENED;
  menu.setVisible(true);
  this.overlay_.setVisible(true);
};

/**
 * @private
 */
wtk.toolbar.Toolbar.prototype.closeMenu_ = function(menu) {
  this.openState_ = wtk.State.CLOSED;
  menu.setVisible(false);
  this.overlay_.setVisible(false);
};

/**
 * @private
 */
wtk.toolbar.Toolbar.prototype.toggleMenu_ = function(menu, button) {
  var visible = menu.isVisible();
  
  if(visible !== true) {
    var offset = goog.style.getPageOffset(button.getElement());
    var bounds = goog.style.getBounds(button.getElement());
    offset.y = offset.y + bounds.height;
    menu.setPosition(offset);
    this.openMenu_(menu);
  } else {
    this.closeMenu_(menu);
  }
};

/**
 * @private
 */
wtk.toolbar.Toolbar.prototype.hideOverlayAndMenus_ = function() {
  this.overlay_.setVisible(false);
  this.hideMenus_();
};

/**
 * @private
 * @param {wtk.toolbar.Menu=} opt_ignoreMenu
 */
wtk.toolbar.Toolbar.prototype.hideMenus_ = function(opt_ignoreMenu) {
  var ignoreId = (opt_ignoreMenu) ? goog.getUid(opt_ignoreMenu) : '';
  var iter = this.buttonsAndMenus_.getValueIterator();
  goog.iter.forEach(iter, function(menu){
    if(goog.getUid(menu) !== ignoreId) {
      this.closeMenu_(menu);
    }
  }, this);
};

/**
 * @private
 */
wtk.toolbar.Toolbar.prototype.handleEnterEvent_ = function(event) {
  var button = event.target;
  var menu = this.buttonsAndMenus_.get(goog.getUid(button));
  if(!menu) return;
  
  if(menu.isVisible() === true) return;
  if(this.openState_ === wtk.State.CLOSED) return;
  this.hideMenus_();
  this.toggleMenu_(menu, button);
};