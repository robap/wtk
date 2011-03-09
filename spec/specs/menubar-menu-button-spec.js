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


goog.require('wtk.menubar.MenuButton');

describe('wtk.menubar.MenuButton', function() {
  var menubarMenuButton;
  beforeEach(function() {
    menubarMenuButton = new wtk.menubar.MenuButton();
    menubarMenuButton.render();
  });
  afterEach(function() {
    menubarMenuButton.dispose();
  });
  describe('default state', function() {
    it('uses the menubar menu button renderer', function() {
      expect(menubarMenuButton.getRenderer() instanceof wtk.menubar.ButtonRenderer).toBe(true);
    });
  });
});