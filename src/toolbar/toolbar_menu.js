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

goog.provide('wtk.toolbar.Menu');

goog.require('goog.ui.Component');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {string} name - the name to be displayed in the button which will
 * open/close this menu
 */
wtk.toolbar.Menu = function(name) {
  goog.base(this);
  
  this.name_ = name;
};
goog.inherits(wtk.toolbar.Menu, goog.ui.Component);

/**
 * @private
 * @type {string}
 */
wtk.toolbar.Menu.prototype.name_ = '';

/**
 * @private
 * @type {boolean}
 */
wtk.toolbar.Menu.prototype.visible_ = false;

/**
 * @private
 * @type {number}
 */
wtk.toolbar.Menu.prototype.zIndex_ = 0;

/**
 * @override
 */
wtk.toolbar.Menu.prototype.createDom = function() {
  var el = this.getDomHelper().createDom('ul', 'ui-menu ui-widget ui-widget-content');
  goog.style.setStyle(el, 'position', 'absolute');
  this.setElementInternal(el);
};

/**
 * @override
 */
wtk.toolbar.Menu.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  
  this.setVisible_();
  this.setZIndex_();
};

/**
 * @return {string}
 */
wtk.toolbar.Menu.prototype.getName = function() {
  return this.name_;
};

/**
 * @return {string}
 */
wtk.toolbar.Menu.prototype.setVisible = function(visible) {
  this.visible_ = visible;
  
  this.setVisible_();
};

/**
 * @param {number}
 */
wtk.toolbar.Menu.prototype.setZIndex = function(zIndex) {
  this.zIndex_ = zIndex;
  
  this.setZIndex_();
};

/**
 * @param {goog.math.Cooridante} coordinate
 */
wtk.toolbar.Menu.prototype.setPosition = function(coordinate) {
  this.coordinate_ = coordinate;
  this.setPosition_();
};

/**
 * @param {wtk.toolbar.MenuItem}
 */
wtk.toolbar.Menu.prototype.addItem = function(menuItem) {
  this.addChild(menuItem, true);
};

/**
 * @return {boolean}
 */
wtk.toolbar.Menu.prototype.isVisible = function() {
  return this.visible_;
};

/**
 * @private
 */
wtk.toolbar.Menu.prototype.setVisible_ = function() {
  var el = this.getElement();
  
  if(el) {
    goog.style.showElement(this.getElement(), this.visible_);
  }
};

/**
 * @param {number}
 */
wtk.toolbar.Menu.prototype.setZIndex_ = function() {
  var el = this.getElement();
  
  if(el) {
    goog.style.setStyle(el, 'z-index', this.zIndex_);
  }
};

/**
 * 
 */
wtk.toolbar.Menu.prototype.setPosition_ = function() {
  var el = this.getElement();
  if(el) {
    goog.style.setPosition(el, this.coordinate_);
  }
};