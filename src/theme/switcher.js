// Copyright 2011 Robert Apodaca. All Rights Reserved.
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

/**
 * @fileoverview Theme switching tool primarily for use only with this library's
 * demo files. This widget renders itself immediately to the id: "switcher"
 * 
 * ex:
 * <div id="switcher"></div>
 * new WTK.theme.Switcher();
 */

goog.provide('WTK.theme.Switcher');

goog.require('goog.ui.ComboBox');
goog.require('goog.array');

/**
 * @constructor
 * @extends {goog.ui.ComboBox}
 */
WTK.theme.Switcher = function(opt_domHelper) {
  goog.base(this, opt_domHelper);
  
  this.setUseDropdownArrow(true);
  this.setDefaultText('Select a theme...');
  this.addThemes_();
  this.attacheListeners_();
  
  this.render(goog.dom.getElement('switcher'));
};
goog.inherits(WTK.theme.Switcher, goog.ui.ComboBox);

/**
 * @private
 */
WTK.theme.Switcher.prototype.addThemes_ = function() {
  //put all themes which can possibly be loaded here
  this.themes_ = [
    'smoothness',
    'ui-lightness'
  ];
  
  for(var i=0; i<this.themes_.length; i++) {
    this.addItem(new goog.ui.ComboBoxItem(this.themes_[i]));
  }
};

/**
 * @private
 */
WTK.theme.Switcher.prototype.attacheListeners_ = function() {
  this.getHandler().listen(this, goog.ui.Component.EventType.CHANGE, this.handleChangeEvent_);
};

/**
 * @private
 */
WTK.theme.Switcher.prototype.handleChangeEvent_ = function() {
  var value = this.getValue();
  var i = goog.array.indexOf(this.themes_, value);
  if(i >= 0) {
    this.loadTheme_(this.themes_[i]);
  }
};

/**
 * @private
 */
WTK.theme.Switcher.prototype.loadTheme_ = function(theme_name) {
  var dom = this.getDomHelper();
  var doc = dom.getDocument();
  var css = 'css/themes/' + theme_name + '/jquery-ui-1.8.8.custom.css';
  
  var link = dom.createDom('link', {'rel': 'stylesheet', 'href': css});
  doc.getElementsByTagName("head")[0].appendChild(link);
};