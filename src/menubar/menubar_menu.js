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

goog.provide('wtk.menubar.Menu');

goog.require('goog.ui.Component');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {string} name - the name to be displayed in the button which will
 * open/close this menu
 */
wtk.menubar.Menu = function(name) {
  goog.base(this);
  
  this.name_ = name;
};
goog.inherits(wtk.menubar.Menu, goog.ui.Component);

/**
 * @private
 * @type {string}
 */
wtk.menubar.Menu.prototype.name_ = '';

/**
 * @private
 * @type {boolean}
 */
wtk.menubar.Menu.prototype.visible_ = false;

/**
 * @private
 * @type {number}
 */
wtk.menubar.Menu.prototype.zIndex_ = 0;

/**
 * @override
 */
wtk.menubar.Menu.prototype.createDom = function() {
  var el = this.getDomHelper().createDom('div', 'ui-widget ui-widget-content');
  goog.style.setStyle(el, 'position', 'absolute');
  this.setElementInternal(el);
};

/**
 * @override
 */
wtk.menubar.Menu.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  
  this.setVisible_();
  this.setZIndex_();
};

/**
 * @return {string}
 */
wtk.menubar.Menu.prototype.getName = function() {
  return this.name_;
};

/**
 * @return {string}
 */
wtk.menubar.Menu.prototype.setVisible = function(visible) {
  this.visible_ = visible;
  
  this.setVisible_();
};

/**
 * @param {number} zIndex
 */
wtk.menubar.Menu.prototype.setZIndex = function(zIndex) {
  this.zIndex_ = zIndex;
  
  this.setZIndex_();
};

/**
 * @param {goog.math.Cooridante} coordinate
 */
wtk.menubar.Menu.prototype.setPosition = function(coordinate) {
  this.coordinate_ = coordinate;
  this.setPosition_();
};

/**
 * @param {wtk.menubar.MenuItem} menuItem
 */
wtk.menubar.Menu.prototype.addItem = function(menuItem) {
  this.addChild(menuItem, true);
};

/**
 * @return {boolean}
 */
wtk.menubar.Menu.prototype.isVisible = function() {
  return this.visible_;
};

/**
 * @private
 */
wtk.menubar.Menu.prototype.setVisible_ = function() {
  var el = this.getElement();
  
  if(el) {
    goog.style.showElement(this.getElement(), this.visible_);
  }
};

/**
 * @private
 */
wtk.menubar.Menu.prototype.setZIndex_ = function() {
  var el = this.getElement();
  
  if(el) {
    goog.style.setStyle(el, 'z-index', this.zIndex_);
  }
};

/**
 * @private
 */
wtk.menubar.Menu.prototype.setPosition_ = function() {
  var el = this.getElement();
  if(el) {
    goog.style.setPosition(el, this.coordinate_);
  }
};