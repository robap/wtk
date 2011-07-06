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

goog.provide('wtk.grid.Grid');

goog.require('goog.ui.Component');
goog.require('wtk.templates.grid');

/**
 * @constructor
 * @extends {goog.ui.Component}
 * @param {array} data
 */
wtk.grid.Grid = function(data) {
  goog.base(this);
  
  this.gridData_ = data;
};
goog.inherits(wtk.grid.Grid, goog.ui.Component);

/**
 * @override
 */
wtk.grid.Grid.prototype.createDom = function() {
  var outer = goog.dom.htmlToDocumentFragment(
    wtk.templates.grid.getGrid(this)
  );
  this.setElementInternal(outer);
};

/**
 * @return {array}
 */
wtk.grid.Grid.prototype.getGridData = function() {
  return this.gridData_;
};