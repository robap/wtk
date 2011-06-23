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

goog.provide('wtk.tab.TabContainerRenderer');

goog.require('goog.ui.ContainerRenderer');
goog.require('wtk.tab.TabBar');
goog.require('wtk.tab.TabContent');

/**
 * @constructor
 * @extends {goog.ui.ContainerRenderer}
 */
wtk.tab.TabContainerRenderer = function() {
  goog.base(this);
};
goog.inherits(wtk.tab.TabContainerRenderer, goog.ui.ContainerRenderer);
goog.addSingletonGetter(wtk.tab.TabContainerRenderer);

/**
 * @override
 */
wtk.tab.TabContainerRenderer.prototype.decorate = function(container, element) {
  goog.dom.classes.add(element, 'ui-tabs', 'ui-widget', 'ui-widget-content', 'ui-corner-all');
  
  var tabBar = new wtk.tab.TabBar();
  var uls = goog.dom.getElementsByTagNameAndClass('ul', null, element);
  if(uls.length === 1) {
    tabBar.decorate(uls[0]);
  }
  container.setTabContainer(tabBar);
  
  var divs = goog.dom.getElementsByTagNameAndClass('div', null, element);
  goog.array.forEach(divs, function(div){
    goog.dom.classes.add(div, wtk.tab.TabContentRenderer.CSS_CLASS);
  });
  
  this.decorateChildren(container, element);
  
  return element;
};

