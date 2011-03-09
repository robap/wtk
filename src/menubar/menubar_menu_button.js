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

goog.provide('wtk.menubar.MenuButton');

goog.require('goog.ui.CustomButton');
goog.require('wtk.menubar.ButtonRenderer');

/**
 * @constructor
 * @extends {goog.ui.CustomButton}
 */
wtk.menubar.MenuButton = function(name, opt_domHelper) {
  var renderer = wtk.menubar.ButtonRenderer.getInstance();
  
  goog.base(this, name, renderer, opt_domHelper);
};
goog.inherits(wtk.menubar.MenuButton, goog.ui.CustomButton);