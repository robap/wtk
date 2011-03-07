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
  var t = '<div class="ui-widget ui-widget-content" style="position: relative; z-index: '+z+';">'
        + '</div>'
        ;
        
  return t;
};

/**
 * returns a menu button template string merged with Toolbar Button object
 * @param {wtk.toolbar.MenuButton} button
 * @return {string}
 */
wtk.templates.toolbar.getMenuButtonTemplate = function(button) {
  
  var name = goog.string.htmlEscape(button.getContent());
  
  var t = '<div style="display: inline-block; cursor: default; border: none; padding: 0.2em 0.4em; font-weight: normal;">'
        +   '<div style="padding: 0.2em;">' + name + '</div>'
        + '</div>'
        ;
        
  return t;
};

/**
 * returns a menu item template string merged with Toolbar menu item object
 * @param {wtk.toolbar.MenuItem} item
 * @return {string}
 */
wtk.templates.toolbar.getMenuItemTemplate = function(item) {
  var name = goog.string.htmlEscape(item.getContent());
  
  var t = '<li class="ui-menu ui-menu-item" style="border: none; cursor: default; min-width: 100px;">'
        +   '<a tabindex="-1" class="ui-corner-all" href="#" style="font-weight: normal;">' + name + '</a>'
        + '</li>'
        ;
        
  return t;
};