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

goog.provide('WTK.demo.dialog');

goog.require('goog.dom');
goog.require('goog.ui.Button');

goog.require('WTK.dialog.Dialog');
goog.require('WTK.theme.Switcher');

WTK.demo.dialog = function(button_id) {
  new WTK.theme.Switcher();
  
  var diag = new WTK.dialog.Dialog();
  diag.setTitle('Demo Dialog');
  diag.setContent('<p>This is the inner content of the Dialog</p>');
  diag.render();
  
  var button = new goog.ui.Button();
  button.decorate(goog.dom.getElement(button_id));
  
  goog.events.listen(button, goog.ui.Component.EventType.ACTION, function(){
    diag.open();
  }, null, this);
};