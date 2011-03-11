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

goog.provide('wtk.templates.menubar');

goog.require('goog.string');

/**
 * returns the main Menubar template string merged with Menubar object
 * @param {wtk.menubar.Menubar} menubar
 * @return {string}
 */
wtk.templates.menubar.getMenubarTemplate = function(menubar) {
  var z = goog.string.htmlEscape(menubar.getZIndex());
  var t = '<div class="ui-widget ui-widget-content" style="position: relative; z-index: '+z+';">'
        + '</div>'
        ;
        
  return t;
};

/**
 * returns a menu button template string merged with Menubar Button object
 * @param {wtk.menubar.MenuButton} button
 * @return {string}
 */
wtk.templates.menubar.getMenuButtonTemplate = function(button) {
  
  var name = goog.string.htmlEscape(button.getContent());
  
  var t = '<div style="display: inline-block; outline-style: none; cursor: default; border: none; padding: 0.2em 0.4em; font-weight: normal;">'
        +   '<div style="padding: 0.2em;">' + name + '</div>'
        + '</div>'
        ;
        
  return t;
};

/**
 * returns a menu item template string merged with Menubar menu item object
 * @param {wtk.menubar.MenuItem} item
 * @return {string}
 */
wtk.templates.menubar.getMenuItemTemplate = function(item) {
  var name = goog.string.htmlEscape(item.getName());
  var shortcutId = goog.string.htmlEscape(item.getShortcutIdentifier() || '');
  var cssClass = goog.string.htmlEscape(item.getIcon() || '');
  if(cssClass !== '') {
    cssClass = 'ui-icon ' + cssClass;
  }
  
  var anchor_id = goog.string.htmlEscape(item.makeId(wtk.menubar.MenuItem.IdFragment.ANCHOR));
  
  var t = '<li class="ui-menu ui-menu-item" style="border: none; cursor: default;">'
        +   '<a id="' + anchor_id + '" tabindex="-1" class="ui-corner-all" href="#" style="font-weight: normal;">'
        +     '<div style="display: inline-block; position: relative; top: 2px; width: 16px; '
        +        'height: 16px; margin-right: 0.3em;" class="' + cssClass + '">'
        +      '</div>'
        +     '<div style="display: inline-block; width: 4.0em;">'
        +       name
        +     '</div>'
        +     '<div style="display: inline-block; margin-left:1em; width: 2.0em;">'
        +       shortcutId
        +     '</div>'
        +   '</a>'
        + '</li>'
        ;
        
  return t;
};