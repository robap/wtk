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

goog.provide('wtk.toolbar.Menu');

goog.require('goog.ui.Component');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {string} name - the name to be displayed
 */
wtk.toolbar.Menu = function(name) {
  goog.base(this);
  
  this.name_ = name;
};
goog.inherits(wtk.toolbar.Menu, goog.ui.Component);

/**
 * @private
 * @type {string}
 */
wtk.toolbar.Menu.prototype.name_ = '';

/**
 * @private
 * @type {boolean}
 */
wtk.toolbar.Menu.prototype.visible_ = false;

/**
 * @override
 */
wtk.toolbar.Menu.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  
  this.setVisible_();
};

/**
 * @return {string}
 */
wtk.toolbar.Menu.prototype.getName = function() {
  return this.name_;
};

/**
 * @return {string}
 */
wtk.toolbar.Menu.prototype.setVisible = function(visible) {
  this.visible_ = visible;
};

/**
 * @private
 */
wtk.toolbar.Menu.prototype.setVisible_ = function() {
  var el = this.getElement();
  
  if(el) {
    goog.style.showElement(this.getElement(), this.visible_);
  }
};