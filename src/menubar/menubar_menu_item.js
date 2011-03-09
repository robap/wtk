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

goog.provide('wtk.menubar.MenuItem');

goog.require('goog.ui.CustomButton');
goog.require('wtk.menubar.ItemRenderer');
goog.require('wtk.icon');

/**
 * @constructor
 * @extends {goog.ui.CustomButton}
 * @param {string} name
 * @param {string} icon
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 */
wtk.menubar.MenuItem = function(name, icon, opt_domHelper) {
  var renderer = wtk.menubar.ItemRenderer.getInstance();
  
  this.name_ = name;
  this.icon_ = icon;
  
  goog.base(this, '', renderer, opt_domHelper);
};
goog.inherits(wtk.menubar.MenuItem, goog.ui.CustomButton);

/**
 * @return {string}
 */
wtk.menubar.MenuItem.prototype.getName = function() {
  return this.name_;
};

/**
 * @return {string}
 */
wtk.menubar.MenuItem.prototype.getIcon = function() {
  return this.icon_;
};