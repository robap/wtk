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


goog.require('wtk.menubar.Menu');

goog.require('wtk.menubar.MenuItem');

describe('wtk.menubar.Menu', function() {
  var menubarMenu, menuName;
  beforeEach(function() {
    menuName = 'foo';
    menubarMenu = new wtk.menubar.Menu(menuName);
    menubarMenu.render();
  });
  afterEach(function() {
    menubarMenu.dispose();
  });
  describe('default state', function() {
    it('sets the menu name when passed to constructor', function() {
      expect(menubarMenu.getName()).toBe(menuName);
    });
    it('is not visible', function() {
      expect(goog.style.isElementShown(menubarMenu.getElement())).toEqual(false);
    });
  });
  describe('#addItem', function() {
    it('adds the item', function() {
      var item = new wtk.menubar.MenuItem('foo');
      menubarMenu.addItem(item);
      expect(menubarMenu.getChildAt(0)).toBe(item);
    });
  });
  describe('#setVisible', function() {
    it('makes the element visible', function() {
      menubarMenu.setVisible(true);
      expect(goog.style.isElementShown(menubarMenu.getElement())).toEqual(true);
    });
  });
});