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
goog.require('wtk.menubar.Menu');

describe('wtk.menubar.MenuItem', function() {
  var menuItem, name, icon, shortcutIdentifier;
  beforeEach(function() {
    name = 'foo';
    icon = wtk.icon.FOLDER_OPEN;
    shortcutIdentifier = 'shift+s'
    menuItem = new wtk.menubar.MenuItem(name, icon, shortcutIdentifier);
    //menuItem.render();
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
    it('sets the shortcut identifier', function() {
      expect(menuItem.getShortcutIdentifier()).toBe(shortcutIdentifier);
    });
    it('prevents default click on anchor', function() {
      //TODO: figure out how to test this
    });
  });
  describe('adding a sub menu', function() {
    var submenu;
    beforeEach(function() {
      submenu = new wtk.menubar.Menu('foo');
    });
    it("dispatches SUBMENU_ADDED event", function() {
      var dispatched = false;
      goog.events.listenOnce(menuItem, wtk.menubar.MenuItem.EventType.SUBMENU_ADDED, function() {
        dispatched = true;
      });
      menuItem.setSubMenu(submenu);
      expect(dispatched).toBe(true);
    });
  });
});