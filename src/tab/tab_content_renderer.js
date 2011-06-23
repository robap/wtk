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

goog.provide('wtk.tab.TabContentRenderer');

goog.require('goog.ui.ControlRenderer');
goog.require('wtk.tab.Tab');

/**
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
wtk.tab.TabContentRenderer = function() {
  goog.base(this);
};
goog.inherits(wtk.tab.TabContentRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(wtk.tab.TabContentRenderer);

/**
 * 
 * @type {string}
 */
wtk.tab.TabContentRenderer.CSS_CLASS = goog.getCssName('ui-tabs-panel');

/**
 * @override
 */
wtk.tab.TabContentRenderer.prototype.getCssClass = function() {
  return wtk.tab.TabContentRenderer.CSS_CLASS;
};

/**
 * @override
 */
wtk.tab.TabContentRenderer.prototype.decorate = function(container, element) {
  goog.dom.classes.add(element, this.getCssClassNames_().join(' '));
  
  goog.base(this, 'decorate', container, element);
  return element;
};

/**
 * Provides minimum required css classes for the <div> container
 * 
 * @private
 */
wtk.tab.TabContentRenderer.prototype.getCssClassNames_ = function() {
  return [
    'ui-widget-content', 'ui-corner-bottom'
  ];
};