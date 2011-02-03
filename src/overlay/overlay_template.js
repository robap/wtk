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

goog.provide('wtk.templates.overlay');

goog.require('goog.string');

/**
 * returns the modal overlay div string
 * @param {wtk.Overlay} overlay
 */
wtk.templates.overlay.getModalOverlay = function(overlay) {
  var overlay_id = goog.string.htmlEscape(overlay.makeId(wtk.Overlay.IdFragment.OVERLAY));
  
  var w = goog.string.htmlEscape(overlay.getWidth());
  var h = goog.string.htmlEscape(overlay.getHeight());
  var z = goog.string.htmlEscape(overlay.getZIndex());
  
  t = '<div id="'+overlay_id+'" class="ui-widget-overlay" style="width: '+w+'px; height: '+h+'px; z-index: '+z+'">'
    + '</div>'
    ;
    
  return t;
};