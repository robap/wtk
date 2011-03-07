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

goog.provide('wtk.toolbar.ItemRenderer');

goog.require('goog.ui.CustomButtonRenderer');

/**
 * @constructor
 * @extends {goog.ui.ButtonRenderer}
 */
wtk.toolbar.ItemRenderer = function() {
  goog.base(this);
};
goog.inherits(wtk.toolbar.ItemRenderer, goog.ui.CustomButtonRenderer);
goog.addSingletonGetter(wtk.toolbar.ItemRenderer);

/**
 * @override
 */
wtk.toolbar.ItemRenderer.prototype.createDom = function(button) {
  var dom = goog.dom.htmlToDocumentFragment(wtk.templates.toolbar.getMenuItemTemplate(button));
  return dom;
};

/**
 * @override
 */
wtk.toolbar.ItemRenderer.prototype.getCssClass = function() {
  return wtk.toolbar.ItemRenderer.CSS_CLASS;
};

/**
 * Returns the ARIA role to be applied to custom items.
 * @return {goog.dom.a11y.Role|undefined} ARIA role.
 * @override
 */
wtk.toolbar.ItemRenderer.prototype.getAriaRole = function() {
  return goog.dom.a11y.Role.MENU_ITEM;
};

/**
 * @override
 */
wtk.toolbar.ItemRenderer.prototype.createClassByStateMap_ = function() {
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
      goog.ui.Component.State.ACTIVE, goog.getCssName(baseClass, 'state-active')
  );
};

/**
 * Default CSS class to be applied to the root element of components rendered
 * by this renderer.
 * @type {string}
 */
wtk.toolbar.ItemRenderer.CSS_CLASS = goog.getCssName('ui');