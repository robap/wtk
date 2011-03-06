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

goog.provide('wtk.templates.toolbar');

goog.require('goog.string');

/**
 * returns the main Toolbar template string merged with Toolbar object
 * @param {wtk.toolbar.Toolbar} toolbar
 * @return {string}
 */
wtk.templates.toolbar.getToolbarTemplate = function(toolbar) {
  var z = goog.string.htmlEscape(toolbar.getZIndex());
  var t = '<div class="ui-widget ui-state-default" style="z-index: '+z+';">'
        + '</div>'
        ;
        
  return t;
};

/**
 * returns the main Toolbar template string merged with Toolbar object
 * @param {wtk.toolbar.MenuButton} button
 * @return {string}
 */
wtk.templates.toolbar.getMenuButtonTemplate = function(button) {
  
  var name = goog.string.htmlEscape(button.getContent());
  
  var t = '<div style="display: inline-block; cursor: default; border: none; padding-left: 0.1em; padding-right: 0.1em;">'
        +   '<div style="padding: 0.2em;">' + name + '</div>'
        + '</div>'
        ;
        
  return t;
};