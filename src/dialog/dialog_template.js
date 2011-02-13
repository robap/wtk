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

goog.provide('wtk.templates.dialog');

goog.require('goog.string');

/**
 * returns the main Dialog template string merged Dialog object
 * @param {wtk.Dialog} dialog
 * @return {string}
 */
wtk.templates.dialog.getMainTemplate = function(dialog) {
  var widget_id = goog.string.htmlEscape(dialog.makeId(wtk.Dialog.IdFragment.DIALOG));
  var header_id = goog.string.htmlEscape(dialog.makeId(wtk.Dialog.IdFragment.HEADER));
  var title_id = goog.string.htmlEscape(dialog.makeId(wtk.Dialog.IdFragment.TITLE));
  var close_id = goog.string.htmlEscape(dialog.makeId(wtk.Dialog.IdFragment.CLOSE));
  var content_id = goog.string.htmlEscape(dialog.makeId(wtk.Dialog.IdFragment.CONTENT));
  
  var width = goog.string.htmlEscape(dialog.getWidth());
  var height = goog.string.htmlEscape(dialog.getHeight());
  var z = goog.string.htmlEscape(dialog.getZIndex());
  
  var t;
  t = '<div id="'+widget_id+'" class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable" style="position: absolute; width: '+width+'px; height: '+height+'px; z-index: '+z+'">'
    +   '<div id="'+header_id+'" class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix">'
    +     '<span class="ui-dialog-title" id="'+title_id+'"></span>'
    +     '<a href="#" id="'+close_id+'" class="ui-dialog-titlebar-close ui-corner-all" role="button">'
    +       '<span class="ui-icon ui-icon-closethick">close</span>'
    +     '</a>'
    +   '</div>'
    +   '<div id="'+content_id+'" class="ui-dialog-content ui-widget-content" style="width: auto; height: auto;">'
    +   '</div>'
    ;
    
    if(dialog.hasButtons()) {
      t += wtk.templates.dialog.getButtonSetTemplate(dialog);
    }
    
    t += '</div>'
    ;
  
  return t;
};

/**
 * @param {wtk.Dialog} dialog
 * @return {string}
 */
wtk.templates.dialog.getButtonSetTemplate = function(dialog) {
  var buttonset_id = goog.string.htmlEscape(dialog.makeId(wtk.Dialog.IdFragment.BUTTONSET));
  var buttonpane_id = goog.string.htmlEscape(dialog.makeId(wtk.Dialog.IdFragment.BUTTONPANE));
  
  var t;
  t = '<div id="' + buttonpane_id + '" class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">'
    +   '<div id="' + buttonset_id + '" class="ui-dialog-buttonset">'
    +   '</div>'
    + '</div>'
    ;
    
  return t;
};