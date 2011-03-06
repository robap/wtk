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
goog.require('wtk.Overlay');
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
 * @private
 * @type {bool}
 */
wtk.Dialog.prototype.modalEnabled_ = false;

/**
 * @private
 * @type {bool}
 */
wtk.Dialog.prototype.state_ = wtk.State.CLOSED;

/**
 * @private
 * @type {string}
 */
wtk.Dialog.prototype.content_ = '';

/**
 * @type {string}
 */
wtk.Dialog.prototype.title_ = '';

/**
 * @private
 * @type {number}
 */
wtk.Dialog.prototype.width_ = 0;

/**
 * @private
 * @type {number}
 */
wtk.Dialog.prototype.height_ = 0;

/**
 * @private
 * @type {number}
 */
wtk.Dialog.prototype.leftPosition_ = 0;

/**
 * @private
 * @type {number}
 */
wtk.Dialog.prototype.topPosition_ = 0;

/**
 * @private
 * @type {wtk.Overlay} or false if not set
 */
wtk.Dialog.prototype.overlay_ = false;

/**
 * @private
 * @type {goog.ui.Component}
 */
wtk.Dialog.prototype.buttonSet_ = false;

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
  
  
  if(this.buttonSet_) {
    var button_set = this.getElementByFragment(wtk.Dialog.IdFragment.BUTTONSET);
    this.buttonSet_.decorate(button_set);
    
    this.buttonSet_.forEachChild(function(button) {
      button.render(this.buttonSet_.getElement());
    }, this);
  }
  
  this.attachListeners_();
};

/**
 * @inheritDoc
 */
wtk.Dialog.prototype.exitDocument = function() {
  if(this.overlay_) {
    this.overlay_.dispose();
  }
  goog.base(this, 'exitDocument');
};

/**
 * When set to true, modal overlay will be used when opening dialog
 * @param {bool} enable_modal
 */
wtk.Dialog.prototype.enableModal = function(enable_modal) {
  this.modalEnabled_ = enable_modal;
};

/**
 * If modal enabled, overlay is created and shown
 * @private
 */
wtk.Dialog.prototype.showOverlay_ = function() {
  if(this.modalEnabled_ !== true) {
    return;
  }
  
  //This code to workout overlay dimensions from goog.ui.Dialog
  var doc = this.getDomHelper().getDocument();
  var win = goog.dom.getWindow(doc) || window;
  var viewSize = goog.dom.getViewportSize(win);
  var width = Math.max(doc.body.scrollWidth, viewSize.width);
  var height = Math.max(doc.body.scrollHeight, viewSize.height);
  
  var zi = this.getZIndex() - 1;
  this.overlay_ = new wtk.Overlay(width, height, zi, this.getDomHelper());
  this.overlay_.render();
};

/**
 * Removes the overlay (if it was rendered during open);
 * @private
 */
wtk.Dialog.prototype.removeOverlay_ = function() {
  if(this.modalEnabled_ !== true) {
    return;
  }
  
  this.overlay_.dispose();
  this.overlay_ = false;
};

/**
 * Opens the dialog, uses open effect if set
 */
wtk.Dialog.prototype.open = function() {
  if(this.state_ === wtk.State.OPENED) {
    return;
  }
  
  this.showOverlay_();
  
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
  
  this.removeOverlay_();
  
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

wtk.Dialog.prototype.getZIndex = function() {
  return 1000;
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
 * @param {wtk.Button} button
 */
wtk.Dialog.prototype.addButton = function(button) {
  if( !this.buttonSet_ ) {
    this.buttonSet_ = new goog.ui.Component();
    this.buttonSet_.setParentEventTarget(this);
  }
  
  this.buttonSet_.addChild(button);
};

/**
 * @return {goog.ui.Component} or false if not set
 */
wtk.Dialog.prototype.getButtonSet = function() {
  return this.buttonSet_;
};

/**
 * @return {boolean}
 */
wtk.Dialog.prototype.hasButtons = function() {
  return ( ! this.buttonSet_ ) ? false : true;
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
  
  this.getHandler().listen(this, wtk.State.OPENED, this.handleOpenEvent_, false, this);
};

/**
 * @private
 */
wtk.Dialog.prototype.handleOpenEvent_ = function(e) {
  var dialog = e.target;
  var title, title_size,title_padding_size;
  var content, content_padding_size;
  var height;
  
  title = dialog.getElementByFragment(wtk.Dialog.IdFragment.TITLE);
  title_size = goog.style.getSize(title);
  title_padding_size = goog.style.getPaddingBox(title);
  content = dialog.getElementByFragment(wtk.Dialog.IdFragment.CONTENT);
  content_padding_size = goog.style.getPaddingBox(content);
  
  height = dialog.getHeight() - dialog.getButtonSetHeight() -
           title_size.height - title_padding_size.top -
           title_padding_size.bottom - content_padding_size.top -
           content_padding_size.bottom;
  
  goog.style.setStyle(content, 'min-height', height + 'px');
};

/**
 * @return {number} the height value
 */
wtk.Dialog.prototype.getButtonSetHeight = function() {
  if(! this.hasButtons()) {
    return 0;
  }
  
  var button_set, button_set_size, button_set_padding_size, button_set_margin_size;
  button_set = this.getElementByFragment(wtk.Dialog.IdFragment.BUTTONPANE);
  
  button_set_size = goog.style.getSize(button_set);
  button_set_padding_size = goog.style.getPaddingBox(button_set);
  button_set_margin_size = goog.style.getMarginBox(button_set);
  
  return button_set_size.height + button_set_padding_size.top +
         button_set_padding_size.bottom + button_set_margin_size.top +
         button_set_margin_size.bottom;
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
  this.dispatchEvent(this.state_);
};

/**
 * @enum {string}
 */
wtk.Dialog.IdFragment = {
  DIALOG      : 'dialog',
  HEADER      : 'head',
  TITLE       : 'title',
  CLOSE       : 'close',
  CONTENT     : 'cont',
  BUTTONSET   : 'bs',
  BUTTONPANE  : 'bp'
};