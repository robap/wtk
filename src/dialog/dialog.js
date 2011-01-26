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

goog.provide('wtk.Dialog');

goog.require('wtk.templates.dialog');
goog.require('wtk.State');
goog.require('goog.ui.Component');
goog.require('goog.style');
goog.require('goog.fx.Dragger');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {number=} opt_width width of Dialog, defaults to 300
 * @param {number=} opt_height height of Dialog, defaults to 200
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 */
wtk.Dialog = function(opt_width, opt_height, opt_domHelper) {
  this.width_ = opt_width || 300;
  this.height_ = opt_height || 200;
  
  goog.base(this, opt_domHelper);
};
goog.inherits(wtk.Dialog, goog.ui.Component);

/**
 * @type {bool}
 */
wtk.Dialog.prototype.state_ = wtk.State.CLOSED;

/**
 * @type {string}
 */
wtk.Dialog.prototype.content_ = '';

/**
 * @type {string}
 */
wtk.Dialog.prototype.title_ = '';

/**
 * @type {number}
 */
wtk.Dialog.prototype.width_ = 0;

/**
 * @type {number}
 */
wtk.Dialog.prototype.height_ = 0;

/**
 * @type {number}
 */
wtk.Dialog.prototype.leftPosition_ = 0;

/**
 * @type {number}
 */
wtk.Dialog.prototype.topPosition_ = 0;

/**
 * The Dialog widget is not designed to be decorated, only rendered
 */
wtk.Dialog.prototype.canDecorate = function() {
  return false;
};

/**
 * @inheritDoc
 */
wtk.Dialog.prototype.createDom = function() {
  var outer = goog.dom.htmlToDocumentFragment(
    wtk.templates.dialog.getMainTemplate(this)
  );
  this.setElementInternal(outer);
  
  goog.style.showElement(outer, false);
};

/**
 * @inheritDoc
 */
wtk.Dialog.prototype.render = function(opt_el) {
  goog.base(this, 'render', opt_el);
  this.setCssPosition_();
};

/**
 * @inheritDoc
 */
wtk.Dialog.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  
  this.setTitleInternal_();
  this.setContentInternal_();
  
  this.attachListeners_();
};

/**
 * Opens the dialog, uses open effect if set
 */
wtk.Dialog.prototype.open = function() {
  if(this.state_ === wtk.State.OPENED) {
    return;
  }
  goog.style.setSize(this.getElement(), this.width_, this.height_);
  if(this.openEffect_) {
    var anim = this.openEffect_.createAnimation(this);
    var handler = this.getHandler();
    handler.listenOnce(anim, goog.fx.Animation.EventType.FINISH, this.handleOpenAnimationFinish_, false, this);
    goog.style.showElement(this.getElement(), true);
    anim.play();
  } else {
    goog.style.showElement(this.getElement(), true);
    this.setState_(wtk.State.OPENED);
  }
};

/**
 * Closes the dialog, uses close effect if set
 */
wtk.Dialog.prototype.close = function() {
  if(this.state_ === wtk.State.CLOSED) {
    return;
  }
  
  if(this.closeEffect_) {
    var anim = this.closeEffect_.createAnimation(this);
    var handler = this.getHandler();
    handler.listenOnce(anim, goog.fx.Animation.EventType.FINISH, this.handleCloseAnimationFinish_, false, this);
    anim.play();
  } else {
    this.setState_(wtk.State.CLOSED);
    goog.style.showElement(this.getElement(), false);
  }
};

wtk.Dialog.prototype.setOpenEffect = function(effect) {
  this.openEffect_ = effect;
};

wtk.Dialog.prototype.setCloseEffect = function(effect) {
  this.closeEffect_ = effect;
};

wtk.Dialog.prototype.getWidth = function() {
  return this.width_;
};

wtk.Dialog.prototype.getHeight = function() {
  return this.height_;
};

/**
 * Sets the title of the Dialog
 * 
 * @param {String} title
 */
wtk.Dialog.prototype.setTitle = function(title) {
  this.title_ = title;
  this.setTitleInternal_();
};

/**
 * @private
 */
wtk.Dialog.prototype.setTitleInternal_ = function() {
  if(this.isInDocument()) {
    var title_el = this.getElementByFragment(wtk.Dialog.IdFragment.TITLE);
    title_el.innerHTML = this.title_;
  }
};

/**
 * Sets the content of the Dialog
 * 
 * @param {String} content
 */
wtk.Dialog.prototype.setContent = function(content) {
  this.content_ = content;
  this.setContentInternal_();
};

/**
 * @private
 */
wtk.Dialog.prototype.setContentInternal_ = function() {
  if(this.isInDocument()) {
    var content_el = this.getElementByFragment(wtk.Dialog.IdFragment.CONTENT);
    content_el.innerHTML = this.content_;
  }
};

/**
 * Sets the positon of the dialog. If already rendered, updates dom
 * 
 * @param {number} left
 * @param {number} top
 */
wtk.Dialog.prototype.setPosition = function(left, top) {
  this.leftPosition_ = left;
  this.topPosition_ = top;
  
  if(this.isInDocument()) {
    this.setCssPosition_();
  }
};

/**
 * Sets the element's css postion to current. Should only ever be called after
 * render
 * @private
 */
wtk.Dialog.prototype.setCssPosition_ = function() {
    goog.style.setPosition(this.getElement(), this.leftPosition_, this.topPosition_);
};

/**
 * @private
 */
wtk.Dialog.prototype.attachListeners_ = function() {
  //This bit of code is from goog.ui.Dialog
  var dom = this.getDomHelper();
  var doc = dom.getDocument();
  var win = goog.dom.getWindow(doc) || window;
  var viewSize = goog.dom.getViewportSize(win);
  var w = Math.max(doc.body.scrollWidth, viewSize.width);
  var h = Math.max(doc.body.scrollHeight, viewSize.height);
  var dialogSize = goog.style.getSize(this.getElement());
  var head = this.getElementByFragment(wtk.Dialog.IdFragment.HEADER);
  var limits = new goog.math.Rect(0, 0, w - dialogSize.width, h - dialogSize.height);
  var dragger = new goog.fx.Dragger(this.getElement(), head, limits);
  
  var close = this.getElementByFragment(wtk.Dialog.IdFragment.CLOSE);
  this.getHandler().listen(close, goog.events.EventType.CLICK, this.handleCloseClick_);
};

/**
 * @private
 */
wtk.Dialog.prototype.handleCloseClick_ = function(event) {
  event.preventDefault();
  this.close();
};

wtk.Dialog.prototype.handleOpenAnimationFinish_ = function(event) {
  this.setState_(wtk.State.OPENED);
  event.anim.dispose();
};

wtk.Dialog.prototype.handleCloseAnimationFinish_ = function(event) {
  this.setState_(wtk.State.CLOSED);
  var el = this.getElement();
  
  goog.style.showElement(el, false);
  event.anim.dispose();
};

/**
 * @private
 */
wtk.Dialog.prototype.setState_ = function(state) {
  this.state_ = state;
};

/**
 * @enum {string}
 */
wtk.Dialog.IdFragment = {
  DIALOG  : 'dialog',
  HEADER  : 'head',
  TITLE   : 'title',
  CLOSE   : 'close',
  CONTENT : 'cont'
};