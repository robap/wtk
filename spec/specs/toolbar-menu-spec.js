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


goog.require('wtk.toolbar.Menu');

goog.require('wtk.toolbar.MenuItem');

describe('wtk.toolbar.Menu', function() {
  var toolbarMenu, menuName;
  beforeEach(function() {
    menuName = 'foo';
    toolbarMenu = new wtk.toolbar.Menu(menuName);
    toolbarMenu.render();
  });
  afterEach(function() {
    toolbarMenu.dispose();
  });
  describe('default state', function() {
    it('sets the menu name when passed to constructor', function() {
      expect(toolbarMenu.getName()).toBe(menuName);
    });
    it('is not visible', function() {
      expect(goog.style.isElementShown(toolbarMenu.getElement())).toEqual(false);
    });
  });
  describe('#addItem', function() {
    it('adds the item', function() {
      var item = new wtk.toolbar.MenuItem('foo');
      toolbarMenu.addItem(item);
      expect(toolbarMenu.getChildAt(0)).toBe(item);
    });
  });
  describe('#setVisible', function() {
    it('makes the element visible', function() {
      toolbarMenu.setVisible(true);
      expect(goog.style.isElementShown(toolbarMenu.getElement())).toEqual(true);
    });
  });
});