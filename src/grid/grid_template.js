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

goog.provide('wtk.templates.grid');

/**
 * @param {wtk.grid.Grid} grid_component
 * @return {string}
 */
wtk.templates.grid.getGrid = function(grid_component) {
  var t = '<div class="ui-widget">'
        + wtk.templates.grid.makeGridTable(grid_component.getGridData())
        + '</div>'
        ;
        
  return t;
};

/**
 * 
 * @return {string}
 */
wtk.templates.grid.makeGridTable = function(data) {
  var row1 = data[0];
  var keys = goog.object.getKeys(row1);
  
  var t =
  '<table width="100%">' +
    '<thead>';
    goog.array.forEach(keys, function(value) {
      value = goog.string.htmlEscape(value);
      t += '<th><div>' + value + '</div></th>';
    });
  t +=
    '</thead>' +
    '<tbody>';
    goog.array.forEach(data, function(row) {
      t += wtk.templates.grid.makeGridRow(row);
    });
  t +=  
    '</tbody>' +
  '</table>'
  ;
  
  return t;
};

/**
 * 
 * @return {string}
 */
wtk.templates.grid.makeGridRow = function(row) {
  var t =
  '<tr>';
    goog.object.forEach(row, function(value, key) {
      value = goog.string.htmlEscape(value);
      t += '<td><div>' + value + '</div></td>';
    });
  t += 
  '</tr>'
  ;
  
  return t;
};