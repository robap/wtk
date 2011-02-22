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

goog.provide('wtk.toolbar.Toolbar');

goog.require('goog.ui.Component');
goog.require('wtk.templates.toolbar');

/**
 * @constructor
 */
wtk.toolbar.Toolbar = function() {
  goog.base(this);
};

goog.inherits(wtk.toolbar.Toolbar, goog.ui.Component);

/**
 * @override
 */
wtk.toolbar.Toolbar.prototype.createDom = function() {
  this.element_ = goog.dom.htmlToDocumentFragment(
    wtk.templates.toolbar.getToolbarTemplate(this)
  );
};