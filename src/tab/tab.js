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

goog.provide('wtk.tab.Tab');

goog.require('goog.ui.Control');
goog.require('wtk.tab.TabRenderer');

/**
 * @constructor
 * @extends {goog.ui.Control}
 */
wtk.tab.Tab = function() {
  goog.base(this, null, wtk.tab.TabRenderer.getInstance());
  
  this.setSupportedState(goog.ui.Component.State.SELECTED, true);
  this.setDispatchTransitionEvents(goog.ui.Component.State.SELECTED, true);
  
  this.contentReference_ = null;
  this.contentReferenceId_ = null;
  this.contentTab_ = null;
};
goog.inherits(wtk.tab.Tab, goog.ui.Control);

/**
 * @override
 */
wtk.tab.Tab.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  
  var a = goog.dom.getElementsByTagNameAndClass('a', null, this.getElement())[0];
  this.contentReferenceId_ = a.href.split('#')[1];
  
  goog.events.listen(a, goog.events.EventType.CLICK, function(e) {
    e.preventDefault();
  });
  
  goog.events.listen(this, goog.ui.Component.EventType.SELECT, this.handleSelect_, false, this);
  goog.events.listen(this, goog.ui.Component.EventType.UNSELECT, this.handleUnSelect_, false, this);
};

/**
 * @return {string}
 */
wtk.tab.Tab.prototype.getContentReferenceId = function() {
  return this.contentReferenceId_;
};

/**
 * @param {{wtk.tab.TabContent} contentTab
 */
wtk.tab.Tab.prototype.setContentTab = function(contentTab) {
  this.contentTab_ = contentTab;
};

/**
 * @return {wtk.tab.TabContent}
 */
wtk.tab.Tab.prototype.getContentTab = function() {
  return this.contentTab_;
};

/**
 * @private
 */
wtk.tab.Tab.prototype.handleSelect_ = function() {
  this.contentTab_.setVisibility(true);
};

/**
 * @private
 */
wtk.tab.Tab.prototype.handleUnSelect_ = function() {
  this.contentTab_.setVisibility(false);
};

// Register a decorator factory function for wtk.tab.Tab.
goog.ui.registry.setDecoratorByClassName(
  wtk.tab.TabRenderer.CSS_CLASS, function() {
      return new wtk.tab.Tab();
    }
);