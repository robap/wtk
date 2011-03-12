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

goog.provide('wtk.menubar.Menubar');

goog.require('goog.ui.Component');
goog.require('goog.structs.Map');
goog.require('wtk.templates.menubar');
goog.require('wtk.menubar.MenuButton');
goog.require('wtk.menubar.Menu');
goog.require('wtk.menubar.MenuItem');
goog.require('wtk.util.window');
goog.require('wtk.Overlay');
goog.require('wtk.State');

/**
 * @constructor
 */
wtk.menubar.Menubar = function(opt_ZIndex) {
  goog.base(this);
  
  this.openState_ = wtk.State.CLOSED;
  this.buttonsAndMenus_ = new goog.structs.Map();
  this.zIndex_ = opt_ZIndex || 900;
  this.initializeMenuContainer_();
  this.initializeOverlay_();
  this.connectListeners_();
};
goog.inherits(wtk.menubar.Menubar, goog.ui.Component);

/**
 * @private
 * @type {number}
 */
wtk.menubar.Menubar.prototype.zIndex_ = 0;

/**
 * @private
 * @type {goog.ui.Component}
 */
wtk.menubar.Menubar.prototype.menuContainer_ = null;

/**
 * @private
 * @type {wtk.Overlay}
 */
wtk.menubar.Menubar.prototype.overlay_ = null;

/**
 * @override
 */
wtk.menubar.Menubar.prototype.createDom = function() {
  this.element_ = goog.dom.htmlToDocumentFragment(
    wtk.templates.menubar.getMenubarTemplate(this)
  );
};

/**
 * @override
 */
wtk.menubar.Menubar.prototype.disposeInternal = function() {
  goog.base(this, 'disposeInternal');
  this.overlay_.dispose();
  this.menuContainer_.dispose();
};

/**
 * @param {wtk.menubar.Menu} menu
 */
wtk.menubar.Menubar.prototype.addMenu = function(menu) {
  menu.setZIndex(this.getZIndex());
  this.menuContainer_.addChild(menu, true);
  
  var menuButton = new wtk.menubar.MenuButton(menu.getName(), this.getDomHelper());
  this.addChild(menuButton, true);
  
  this.buttonsAndMenus_.set(goog.getUid(menuButton), menu);
};

/**
 * @return {number}
 */
wtk.menubar.Menubar.prototype.getZIndex = function() {
  return this.zIndex_;
};

/**
 * @private
 */
wtk.menubar.Menubar.prototype.initializeMenuContainer_ = function() {
  this.menuContainer_ = new goog.ui.Component();
  this.menuContainer_.render();
};

/**
 * @private
 */
wtk.menubar.Menubar.prototype.initializeOverlay_ = function() {
  var winSize = wtk.util.window.getWindowBox(this.getDomHelper());
  this.overlay_ = new wtk.Overlay(winSize.right, winSize.bottom, this.zIndex_ - 1, this.getDomHelper());
  this.overlay_.setVisible(false);
  this.overlay_.render();
  goog.events.listen(this.overlay_.getElement(), goog.events.EventType.CLICK, this.hideOverlayAndMenus_, false, this);
};

/**
 * @private
 */
wtk.menubar.Menubar.prototype.connectListeners_ = function() {
  goog.events.listen(this, goog.ui.Component.EventType.ACTION, this.handleAction_, false, this);
  goog.events.listen(this, goog.ui.Component.EventType.ENTER, this.handleEnterEvent_, false, this);
  goog.events.listen(this.menuContainer_, goog.ui.Component.EventType.ACTION, this.handleMenuActionEvent_, false, this);
  goog.events.listen(this.menuContainer_, wtk.menubar.MenuItem.EventType.SUBMENU_ADDED, this.handleSubMenuAddedEvent_, false, this);
  goog.events.listen(this.menuContainer_, goog.ui.Component.EventType.ENTER, this.handleMenuItemEnterEvent_, false, this);
};

/**
 * @private
 */
wtk.menubar.Menubar.prototype.handleAction_ = function(event) {
  var button = event.target;
  var menu = this.buttonsAndMenus_.get(goog.getUid(button));
  if(!menu) return;
  
  this.hideMenus_(menu);
  this.toggleMenu_(menu, button);
};

/**
 * @private
 */
wtk.menubar.Menubar.prototype.openMenu_ = function(menu) {
  this.openState_ = wtk.State.OPENED;
  menu.setVisible(true);
  this.overlay_.setVisible(true);
};

/**
 * @private
 */
wtk.menubar.Menubar.prototype.closeMenu_ = function(menu) {
  this.openState_ = wtk.State.CLOSED;
  menu.setVisible(false);
  this.overlay_.setVisible(false);
};

/**
 * @private
 */
wtk.menubar.Menubar.prototype.toggleMenu_ = function(menu, button) {
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
wtk.menubar.Menubar.prototype.openSubMenu_ = function(menu, button) {
  var visible = menu.isVisible();
  
  if(visible !== true) {
    var offset = goog.style.getPageOffset(button.getElement());
    var bounds = goog.style.getBounds(button.getElement());
    offset.x = offset.x + bounds.width;
    menu.setPosition(offset);
    this.openMenu_(menu);
  }
};

/**
 * @private
 */
wtk.menubar.Menubar.prototype.hideOverlayAndMenus_ = function() {
  this.overlay_.setVisible(false);
  this.hideMenus_();
};

/**
 * @private
 * @param {wtk.menubar.Menu=} opt_ignoreMenu
 */
wtk.menubar.Menubar.prototype.hideMenus_ = function(opt_ignoreMenu) {
  var ignoreId = (opt_ignoreMenu) ? goog.getUid(opt_ignoreMenu) : '';
  this.menuContainer_.forEachChild(function(menu){
    if(goog.getUid(menu) !== ignoreId) {
      this.closeMenu_(menu);
    }
  }, this);
};

/**
 * @private
 */
wtk.menubar.Menubar.prototype.handleEnterEvent_ = function(event) {
  var button = event.target;
  var menu = this.buttonsAndMenus_.get(goog.getUid(button));
  if(!menu) return;
  
  if(menu.isVisible() === true) return;
  if(this.openState_ === wtk.State.CLOSED) return;
  this.hideMenus_();
  this.toggleMenu_(menu, button);
};

/**
 * @private
 */
wtk.menubar.Menubar.prototype.handleMenuActionEvent_ = function() {
  this.hideOverlayAndMenus_();
};

/**
 * @private
 */
wtk.menubar.Menubar.prototype.handleSubMenuAddedEvent_ = function(event) {
  var item = event.target;
  var menu = item.getSubMenu();
  menu.setZIndex(this.getZIndex());
  this.menuContainer_.addChild(menu, true);
  
  this.buttonsAndMenus_.set(goog.getUid(item), menu);
};

/**
 * @private
 */
wtk.menubar.Menubar.prototype.handleMenuItemEnterEvent_ = function(event) {
  var item = event.target;
  
  var parentMenu = item.getParent();
  parentMenu.forEachChild(function(siblingItem) {
    var siblingSubMenu = siblingItem.getSubMenu();
    
    if(siblingSubMenu !== null) {
      siblingSubMenu.setVisible(false);
    }
  }, this);
  
  var subMenu = item.getSubMenu();
  if(subMenu === null) {
    return;
  }
  
  this.openSubMenu_(subMenu, item);
};