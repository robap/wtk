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

goog.provide('wtk.effects.FadeOut');

goog.require('wtk.effects.AbstractEffect');
goog.require('goog.fx.dom.FadeOut');

/**
 * @constructor
 * @extends {wtk.effects.AbstractEffect}
 * @param {number} time
 * @param {Function=} opt_acc
 */
wtk.effects.FadeOut = function(time, opt_acc) {
  goog.base(this, time, opt_acc);
};
goog.inherits(wtk.effects.FadeOut, wtk.effects.AbstractEffect);

/**
 * Creates a suitable animation for the supplied widget
 * 
 * @param {goog.ui.Component} widget
 * @return {goog.fx.Animation}
 */
wtk.effects.FadeOut.prototype.createAnimation = function(widget) {
  return new goog.fx.dom.FadeOut(widget.getElement(), this.time_, this.accelerate_);
};