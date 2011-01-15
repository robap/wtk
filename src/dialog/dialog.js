// Copyright 2011 Robert Apodaca. All Rights Reserved.
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

goog.provide('WTK.dialog.Dialog');

goog.require('WTK.templates');
goog.require('goog.ui.Component');
goog.require('goog.style');
goog.require('goog.fx.Dragger');

/**
 * @constructor
 * @extends {goog.ui.Component}
 */
WTK.dialog.Dialog = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
};
goog.inherits(WTK.dialog.Dialog, goog.ui.Component);

/**
 * @type bool
 */
WTK.dialog.Dialog.prototype.showing_ = false;

/**
 * @inheritDoc
 */
WTK.dialog.Dialog.prototype.createDom = function() {
  var data = {
    'header_id': this.makeId(WTK.dialog.Dialog.IdFragment.HEADER),
    'close_id' : this.makeId(WTK.dialog.Dialog.IdFragment.CLOSE)
  };
  var outer = goog.dom.htmlToDocumentFragment(WTK.templates.dialog(data));
  this.setElementInternal(outer);
  
  goog.style.showElement(outer, false);
};

/**
 * @inheritDoc
 */
WTK.dialog.Dialog.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  
  this.attachListeners_();
};

/**
 * Opens the dialog
 */
WTK.dialog.Dialog.prototype.open = function() {
  if(this.showing_ === true) {
    return;
  }
  
  goog.style.showElement(this.getElement(), true);
  
  this.showing_ = true;
};

/**
 * Closes the dialog
 */
WTK.dialog.Dialog.prototype.close = function() {
  if(this.showing_ === false) {
    return;
  }
  
  goog.style.showElement(this.getElement(), false);
  
  this.showing_ = false;
};

/**
 * @inheritDoc
 */
WTK.dialog.Dialog.prototype.dispose = function() {
  this.detachListeners_();
  
  goog.base(this, 'dispose');
};

/**
 * @private
 */
WTK.dialog.Dialog.prototype.attachListeners_ = function() {
  //This bit of code is from goog.ui.Dialog
  var dom = this.getDomHelper();
  var doc = dom.getDocument();
  var win = goog.dom.getWindow(doc) || window;
  var viewSize = goog.dom.getViewportSize(win);
  var w = Math.max(doc.body.scrollWidth, viewSize.width);
  var h = Math.max(doc.body.scrollHeight, viewSize.height);
  var dialogSize = goog.style.getSize(this.getElement());
  var head = this.getElementByFragment(WTK.dialog.Dialog.IdFragment.HEADER);
  var limits = new goog.math.Rect(0, 0, w - dialogSize.width, h - dialogSize.height);
  var dragger = new goog.fx.Dragger(this.getElement(), head, limits);
  
  var close = this.getElementByFragment(WTK.dialog.Dialog.IdFragment.CLOSE);
  this.getHandler().listen(close, goog.events.EventType.CLICK, this.handleCloseClick_);
  
  
};

/**
 * @private
 */
WTK.dialog.Dialog.prototype.detachListeners_ = function() {
  var close = this.getElementByFragment(WTK.dialog.Dialog.IdFragment.CLOSE);
  this.getHandler().unlisten(close, goog.events.EventType.CLICK, this.handleCloseClick_);
};

WTK.dialog.Dialog.prototype.handleCloseClick_ = function(event) {
  event.preventDefault();
  this.close();
};

WTK.dialog.Dialog.IdFragment = {
  HEADER : 'h',
  CLOSE  : 'c'
};