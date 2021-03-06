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

goog.provide('wtk.Button');

goog.require('goog.ui.Button');
goog.require('wtk.ButtonRenderer');

/**
 * @constructor
 * @extends {goog.ui.Button}
 */
wtk.Button = function(content, opt_renderer, opt_domHelper) {
  var renderer = opt_renderer || wtk.ButtonRenderer.getInstance();
  
  goog.base(this, content, renderer, opt_domHelper);
};
goog.inherits(wtk.Button, goog.ui.Button);


/**
 * @enum {string}
 */
wtk.Button.IdFragment = {
  BUTTON  : 'button',
  TEXT    : 'text'
};