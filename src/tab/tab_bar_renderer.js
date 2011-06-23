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

goog.provide('wtk.tab.TabBarRenderer');

goog.require('goog.ui.TabBarRenderer');
goog.require('wtk.tab.Tab');

/**
 * @constructor
 * @extends {goog.ui.TabBarRenderer}
 */
wtk.tab.TabBarRenderer = function() {
  goog.base(this);
};
goog.inherits(wtk.tab.TabBarRenderer, goog.ui.TabBarRenderer);
goog.addSingletonGetter(wtk.tab.TabBarRenderer);

/**
 * 
 * @type {string}
 */
wtk.tab.TabBarRenderer.CSS_CLASS = goog.getCssName('ui-tabs-nav');

/**
 * @override
 */
wtk.tab.TabBarRenderer.prototype.getCssClass = function() {
  return wtk.tab.TabBarRenderer.CSS_CLASS;
};

/**
 * @override
 */
wtk.tab.TabBarRenderer.prototype.decorate = function(container, element) {
  goog.dom.classes.add(element, this.getCssClassNames_().join(' '));
  
  var lis = goog.dom.getElementsByTagNameAndClass('li', null, element);
  if(lis.length > 0) {
    goog.array.forEach(lis, function(li) {
      goog.dom.classes.add(li, wtk.tab.TabRenderer.CSS_CLASS);
    });
  }
  
  this.decorateChildren(container, element);
  
  return element;
};

/**
 * @override
 */
wtk.tab.TabBarRenderer.prototype.canDecorate = function(element) {
  return element.tagName == 'UL';
};

/**
 * Provides minimum required css classes for the <ul> container
 * 
 * @private
 */
wtk.tab.TabBarRenderer.prototype.getCssClassNames_ = function() {
  return [
    'ui-tabs-nav', 'ui-helper-reset', 'ui-helper-clearfix', 'ui-widget-header', 
    'ui-corner-all'
  ]
};