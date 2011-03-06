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
goog.require('wtk.templates.toolbar');
goog.require('wtk.toolbar.MenuButton');
goog.require('wtk.util.window');
goog.require('wtk.Overlay');

/**
 * @constructor
 */
wtk.toolbar.Toolbar = function(opt_ZIndex) {
  goog.base(this);
  
  this.zIndex_ = opt_ZIndex || 900;
};
goog.inherits(wtk.toolbar.Toolbar, goog.ui.Component);

/**
 * @override
 */
wtk.toolbar.Toolbar.prototype.createDom = function() {
  this.element_ = goog.dom.htmlToDocumentFragment(
    wtk.templates.toolbar.getToolbarTemplate(this)
  );
  
  var winSize = wtk.util.window.getWindowBox(this.getDomHelper());
  this.overlay_ = new wtk.Overlay(winSize.right, winSize.bottom, this.zIndex_ - 1, this.getDomHelper());
  this.overlay_.setVisible(false);
};

/**
 * @override
 */
wtk.toolbar.Toolbar.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  
  this.overlay_.render();
};

/**
 * @override
 */
wtk.toolbar.Toolbar.prototype.exitDocument = function() {
  this.overlay_.dispose();
};

/**
 * @param {wtk.toolbar.Menu} menu
 */
wtk.toolbar.Toolbar.prototype.addMenu = function(menu) {
  var menuButton = new wtk.toolbar.MenuButton(menu.getName(), this.getDomHelper());
  this.addChild(menuButton, true);
};

/**
 * @return {number}
 */
wtk.toolbar.Toolbar.prototype.getZIndex = function() {
  return this.zIndex_;
};