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

goog.provide('wtk.Overlay');

goog.require('goog.ui.Component');
goog.require('goog.style');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {number} width
 * @param {number} height
 * @param {number} zIndex
 * @param {goog.dom.DomHelper=} opt_domHelper
 */
wtk.Overlay = function(width, height, zIndex, opt_domHelper) {
  goog.base(this, opt_domHelper);
  
  this.zIndex_ = zIndex;
  this.width_ = width;
  this.height_ = height;
};
goog.inherits(wtk.Overlay, goog.ui.Component);

/**
 * @private
 * @type {number}
 */
wtk.Overlay.prototype.width_ = 0;

/**
 * @private
 * @type {number}
 */
wtk.Overlay.prototype.height_ = 0;

/**
 * @private
 * @type {number}
 */
wtk.Overlay.prototype.zIndex_ = 0;

/**
 * @private
 * @type {boolean}
 */
wtk.Overlay.prototype.visible_ = true;

/**
 * @inheritDoc
 */
wtk.Overlay.prototype.createDom = function() {
  var el = this.getDomHelper().createDom('div');
  goog.style.setSize(el, this.width_, this.height_);
  goog.style.setStyle(el, 'position', 'absolute');
  goog.style.setStyle(el, 'top', '0');
  goog.style.setStyle(el, 'left', '0');
  
  this.setElementInternal(el);
  this.setZIndex_();
};

/**
 * @inheritDoc
 */
wtk.Overlay.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  
  this.setVisible_();
};

/**
 * sets to visisble
 */
wtk.Overlay.prototype.setVisible = function(visible) {
  this.visible_ = visible;
  this.setVisible_();
};

/**
 * @return {boolean}
 */
wtk.Overlay.prototype.isVisible = function() {
  return this.visible_;
};

/**
 * Gets the width
 * @return {number}
 */
wtk.Overlay.prototype.getWidth = function() {
  return this.width_;
};

/**
 * Gets the height
 * @return {number}
 */
wtk.Overlay.prototype.getHeight = function() {
  return this.height_;
};

/**
 * Gets the z-index
 * @return {number}
 */
wtk.Overlay.prototype.getZIndex = function() {
  return this.zIndex_;
};

/**
 * @param {number} zIndex
 */
wtk.Overlay.prototype.setZIndex = function(zIndex) {
  this.zIndex_ = zIndex;
  this.setZIndex_();
};

/**
 * @private
 */
wtk.Overlay.prototype.setZIndex_ = function() {
  var el = this.getElement();
  if(el) {
    goog.style.setStyle(el, 'zIndex', this.zIndex_);
  }
};

wtk.Overlay.prototype.setVisible_ = function() {
  var el = this.getElement();
  
  if(el) {
    goog.style.showElement(this.getElement(), this.visible_);
  }
};