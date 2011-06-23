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

goog.provide('wtk.tab.TabRenderer');

goog.require('goog.ui.ControlRenderer');

/**
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
wtk.tab.TabRenderer = function() {
  goog.base(this);
};
goog.inherits(wtk.tab.TabRenderer, goog.ui.ControlRenderer);
goog.addSingletonGetter(wtk.tab.TabRenderer);

wtk.tab.TabRenderer.prototype.decorate = function(control, element) {
  goog.dom.classes.add(element, 'ui-state-default', 'ui-corner-top');
  
  goog.base(this, 'decorate', control, element);
  
  return element;
};

/**
 * @override
 */
wtk.tab.TabRenderer.prototype.getCssClass = function() {
  return wtk.tab.TabRenderer.CSS_CLASS;
};

/**
 * @override
 */
wtk.tab.TabRenderer.prototype.createClassByStateMap_ = function() {
  var baseClass = this.getStructuralCssClass();

  /**
   * @type {Object}
   * @private
   */
  this.classByState_ = goog.object.create(
      goog.ui.Component.State.DISABLED, goog.getCssName(baseClass, 'state-disabled'),
      goog.ui.Component.State.HOVER, goog.getCssName(baseClass, 'state-hover'),
      goog.ui.Component.State.FOCUSED, goog.getCssName(baseClass, 'state-focus'),
      goog.ui.Component.State.SELECTED, goog.getCssName(baseClass, 'state-active')
    );
};

/**
 * @type {string}
 */
wtk.tab.TabRenderer.CSS_CLASS = goog.getCssName('ui');