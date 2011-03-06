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


goog.require('wtk.toolbar.MenuButton');

describe('wtk.toolbar.MenuButton', function() {
  var toolbarMenuButton;
  beforeEach(function() {
    toolbarMenuButton = new wtk.toolbar.MenuButton();
    toolbarMenuButton.render();
  });
  afterEach(function() {
    toolbarMenuButton.dispose();
  });
  describe('default state', function() {
    it('uses the toolbar menu button renderer', function() {
      expect(toolbarMenuButton.getRenderer() instanceof wtk.toolbar.ButtonRenderer).toBe(true);
    });
  });
});