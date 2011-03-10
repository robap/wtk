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


goog.require('wtk.menubar.MenuItem');

goog.require('goog.testing.events');
goog.require('goog.events');

describe('wtk.menubar.MenuItem', function() {
  var menuItem, name, icon;
  beforeEach(function() {
    name = 'foo';
    icon = wtk.icon.FOLDER_OPEN;
    menuItem = new wtk.menubar.MenuItem(name, icon);
    menuItem.render();
  });
  afterEach(function() {
    menuItem.dispose();
  });
  describe('default rendered state', function() {
    it('sets the name', function() {
      expect(menuItem.getName()).toBe(name);
    });
    it('sets the icon', function() {
      expect(menuItem.getIcon()).toBe(icon);
    });
    it('prevents default click on anchor', function() {
      //TODO: figure out how to test this
    });
  });
});