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

/**
 * @fileoverview Theme switching tool primarily for use only with this library's
 * demo files. This widget renders itself immediately to the id: "switcher"
 * 
 * ex:
 * <select id="switcher"></select>
 * new wtk.ThemeSwitcher('switcher');
 */

goog.provide('wtk.ThemeSwitcher');

goog.require('goog.dom');
goog.require('goog.dom.forms');
goog.require('goog.array');

/**
 * @constructor
 */
wtk.ThemeSwitcher = function() {
  var div = goog.dom.getElement('switcher');
  var label = goog.dom.createElement('label');
  label.innerHTML = 'Select Theme';
  this.combo_ = goog.dom.createElement('select');
  goog.dom.appendChild(div, label);
  goog.dom.appendChild(div, this.combo_);
  
  this.addThemes_();
  
  goog.events.listen(this.combo_, goog.events.EventType.CHANGE, this.handleChangeEvent_, null, this);
};

/**
 * @private
 */
wtk.ThemeSwitcher.prototype.addThemes_ = function() {
  //put all themes which can possibly be loaded here
  this.themes_ = [
    'base',
    'black-tie',
    'blitzer',
    'cupertino',
    'dark-hive',
    'dot-luv',
    'eggplant',
    'excite-bike',
    'flick',
    'hot-sneaks',
    'humanity',
    'le-frog',
    'mint-choc',
    'overcast',
    'pepper-grinder',
    'redmond',
    'smoothness',
    'south-street',
    'start',
    'sunny',
    'swanky-purse',
    'trontastic',
    'ui-darkness',
    'ui-lightness',
    'vader'
  ];
  
  var option = goog.dom.createElement('option');
  goog.dom.appendChild(this.combo_, option);
  
  for(var i=0; i<this.themes_.length; i++) {
    option = goog.dom.createElement('option');
    option.innerHTML = this.themes_[i];
    goog.dom.appendChild(this.combo_, option);
  }
};

/**
 * @private
 */
wtk.ThemeSwitcher.prototype.handleChangeEvent_ = function() {
  var value = goog.dom.forms.getValue(this.combo_);
  var i = goog.array.indexOf(this.themes_, value);
  if(i >= 0) {
    this.loadTheme_(this.themes_[i]);
  }
};

/**
 * @private
 */
wtk.ThemeSwitcher.prototype.loadTheme_ = function(theme_name) {
  var doc = goog.dom.getDocument();
  var css = 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.8/themes/' + theme_name + '/jquery-ui.css';
  
  var link = goog.dom.createDom('link', {'rel': 'stylesheet', 'href': css});
  doc.getElementsByTagName("head")[0].appendChild(link);
};