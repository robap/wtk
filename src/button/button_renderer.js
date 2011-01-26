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

goog.provide('wtk.ButtonRenderer');

goog.require('goog.ui.ButtonRenderer');
goog.require('wtk.templates.button');

/**
 * @constructor
 * @extends {goog.ui.ButtonRenderer}
 */
wtk.ButtonRenderer = function() {
  goog.base(this);
};
goog.inherits(wtk.ButtonRenderer, goog.ui.ButtonRenderer);
goog.addSingletonGetter(wtk.ButtonRenderer);

/**
 * @override
 */
wtk.ButtonRenderer.prototype.createDom = function(button) {
  return goog.dom.htmlToDocumentFragment(wtk.templates.button.getButtonTemplate(button));
};

/**
 * @override
 */
wtk.ButtonRenderer.prototype.getCssClass = function() {
  return wtk.ButtonRenderer.CSS_CLASS;
};

/**
 * @override
 */
wtk.ButtonRenderer.prototype.createClassByStateMap_ = function() {
  var baseClass = this.getStructuralCssClass();

  /**
   * Map of component states to state-specific structural class names,
   * used when changing the DOM in response to a state change.  Precomputed
   * and cached on first use to minimize object allocations and string
   * concatenation.
   * @type {Object}
   * @private
   */
  this.classByState_ = goog.object.create(
      goog.ui.Component.State.DISABLED, goog.getCssName(baseClass, 'state-disabled'),
      goog.ui.Component.State.HOVER, goog.getCssName(baseClass, 'state-hover'),
      goog.ui.Component.State.ACTIVE, goog.getCssName(baseClass, 'state-active'),
      goog.ui.Component.State.FOCUSED, goog.getCssName(baseClass, 'state-focus'));
};

/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
wtk.ButtonRenderer.CSS_CLASS = goog.getCssName('ui');