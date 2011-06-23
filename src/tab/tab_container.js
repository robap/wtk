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

goog.provide('wtk.tab.TabContainer');

goog.require('goog.ui.Container');
goog.require('wtk.tab.TabContainerRenderer');

/**
 * @constructor
 * @extends {goog.ui.Container}
 */
wtk.tab.TabContainer = function(opt_content, opt_renderer) {
  var renderer = opt_renderer || wtk.tab.TabContainerRenderer.getInstance();
  goog.base(this, opt_content, renderer);
};
goog.inherits(wtk.tab.TabContainer, goog.ui.Container);

/**
 * @param {wtk.tab.TabContainer} tabContainer
 */
wtk.tab.TabContainer.prototype.setTabContainer = function(tabContainer) {
  this.tabContainer_ = tabContainer;
}

/**
 * @override
 */
wtk.tab.TabContainer.prototype.enterDocument = function() {
  goog.base(this, 'enterDocument');
  
  this.tabContainer_.forEachChild(function(tab) {
    var ref_id = tab.getContentReferenceId();
    this.forEachChild(function(contentTab) {
      if(ref_id === contentTab.getElement().id) {
        tab.setContentTab(contentTab);
      }
    });
  }, this);
  
  goog.events.listen(this.tabContainer_, goog.ui.Component.EventType.ACTION, this.handleMenuBar_, false, this);
  
  //for now, default the active tab to the first one
  this.activateTab(this.tabContainer_.getChildAt(0));
};

/**
 * Activates the supplied tab. Deactivates others in this container
 * 
 * @param {wtk.tab.Tab} activeTab
 */
wtk.tab.TabContainer.prototype.activateTab = function(activeTab) {
  this.tabContainer_.forEachChild(function(tab) {
      tab.setSelected(true);
      tab.setSelected(false);
  });
  activeTab.setSelected(true);
};

/**
 * @private
 */
wtk.tab.TabContainer.prototype.handleMenuBar_ = function(event) {
  this.activateTab(event.target);
};