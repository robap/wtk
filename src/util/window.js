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

goog.provide('wtk.util.window');

goog.require('goog.dom');
goog.require('goog.math.Box');

wtk.util.window.getWindowBox = function(opt_domHelper) {
  //This code to workout window dimensions from goog.ui.Dialog
  var domHelper = opt_domHelper || goog.dom.getDomHelper();
  
  var doc = domHelper.getDocument();
  var win =  domHelper.getWindow(doc) || window;
  var viewSize = domHelper.getViewportSize(win);
  var width = Math.max(doc.body.scrollWidth, viewSize.width);
  var height = Math.max(doc.body.scrollHeight, viewSize.height);
  
  return new goog.math.Box(0, width, height, 0);
};