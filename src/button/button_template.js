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

goog.provide('wtk.templates.button');

goog.require('goog.string');

/**
 * @param {wtk.Button} button
 * @return {string}
 */
wtk.templates.button.getButtonTemplate = function(button) {
  var button_id = button.makeId(wtk.Button.IdFragment.BUTTON);
  var text_id = button.makeId(wtk.Button.IdFragment.TEXT);
  var button_text = goog.string.htmlEscape(button.getContent());
  
  var t;
  
  t = '<button id="'+button_id+'" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only">'
    +   '<span id="'+text_id+'" class="ui-button-text">'+button_text+'</span>'
    + '</button>'
    ;
  
  return t;
};