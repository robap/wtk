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

goog.provide('wtk.effects.AbstractEffect');

goog.require('wtk.effects.orientation');

/**
 * @param {number} time
 * @param {Function=} opt_acc Acceleration function, returns 0-1 for inputs 0-1
 * @constructor
 */
wtk.effects.AbstractEffect = function(time, opt_acc) {
  this.time_ = time;
  this.accelerate_ = opt_acc;
};

wtk.effects.AbstractEffect.prototype.createAnimation = goog.abstractMethod;
