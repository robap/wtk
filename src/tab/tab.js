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

goog.provide('wtk.tab.Tab');

goog.require('goog.ui.Control');
goog.require('wtk.tab.TabRenderer');

wtk.tab.Tab = function() {
  goog.base(this, null, wtk.tab.TabRenderer.getInstance());
};
goog.inherits(wtk.tab.Tab, goog.ui.Control);

// Register a decorator factory function for goog.ui.Tabs.
goog.ui.registry.setDecoratorByClassName(
  wtk.tab.TabRenderer.CSS_CLASS, function() {
      return new wtk.tab.Tab();
    }
);