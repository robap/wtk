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

goog.provide('wtk.util.Command');

goog.require('goog.events.EventTarget');
goog.require('goog.structs.Set');

/**
 * @constructor
 * @extends {goog.events.EventTarget}
 */
wtk.util.Command = function() {
  goog.base(this);
  
  this.controls_ = new goog.structs.Set();
};
goog.inherits(wtk.util.Command, goog.events.EventTarget);

/**
 * @private
 * @type {boolean}
 */
wtk.util.Command.prototype.enabled_ = true;

/**
 * @private
 * @type {goog.structs.Set}
 */
wtk.util.Command.prototype.controls_ = null;

/**
 * Attempts to dispatch the EXECUTE event
 */
wtk.util.Command.prototype.execute = function() {
  if(this.enabled_) {
    this.dispatchEvent(wtk.util.Command.EventType.EXECUTE);
  }
};

/**
 * @param {boolean} enable
 */
wtk.util.Command.prototype.setEnable = function(enable) {
  this.enabled_ = enable;
  this.setEnable_();
};

/**
 * @return {boolean}
 */
wtk.util.Command.prototype.getEnable = function() {
  return this.enabled_;
};

/**
 * Can be anything which extends or implements Control's setState method (such as Button)
 * @param {goog.ui.Control} control
 */
wtk.util.Command.prototype.attachControl = function(control) {
  this.controls_.add(control);
  goog.events.listen(control, goog.ui.Component.EventType.ACTION, this.execute, false, this);
  this.setEnable_();
};

/**
 * @private
 */
wtk.util.Command.prototype.setEnable_ = function() {
  var state = (this.enabled_) ? false : true;
  var controls = this.controls_.getValues();
  for(var i = 0; i<controls.length; i++) {
    controls[i].setState(goog.ui.Component.State.DISABLED, state);
  }
};

wtk.util.Command.EventType = {
  EXECUTE: 'EXECUTE'
}