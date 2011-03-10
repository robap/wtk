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


goog.require('wtk.menubar.Menubar');
goog.require('wtk.menubar.Menu');

goog.require('goog.dom.classes');
goog.require('goog.testing.events');

describe('wtk.menubar.Menubar', function() {
  var menubar;
  beforeEach(function() {
    menubar = new wtk.menubar.Menubar();
  });
  afterEach(function() {
    menubar.dispose();
  });
  describe('Adding a menu', function() {
    var menu, menuName;
    beforeEach(function() {
      menubar.render();
      menuName = 'foo';
      menu = new wtk.menubar.Menu(menuName);
      menubar.addMenu(menu);
    });
    describe('with name foo', function(){
      it('creates a MenuButton with name foo in the menubar', function() {
        var menuButton = menubar.getChildAt(0);
        expect(menuButton.getContent()).toBe(menuName);
      });
      it('adds the menu to the menu container', function() {
        expect(menubar.menuContainer_.getChildAt(0)).toBe(menu);
      });
      it('gives the menu its own zIndex value', function() {
        expect(menu.zIndex_).toBe(menubar.getZIndex());
      });
    });
  });
  describe('menuButton action', function() {
    var menu;
    beforeEach(function() {
      menubar.render();
      menu = new wtk.menubar.Menu('foo');
      menubar.addMenu(menu);
    });
    describe('when the button action fires once', function() {
      it('displays the overlay', function() {
        menubar.getChildAt(0).dispatchEvent(goog.ui.Component.EventType.ACTION);
        expect(menubar.overlay_.isVisible()).toBe(true);
      });
      it('displays the corresponding menu', function() {
        menubar.getChildAt(0).dispatchEvent(goog.ui.Component.EventType.ACTION);
        expect(menubar.buttonsAndMenus_.get(goog.getUid(menubar.getChildAt(0))).isVisible()).toBe(true);
      });
    });
    describe('when the button action fires twice', function() {
      it('hides the overlay', function() {
        menubar.getChildAt(0).dispatchEvent(goog.ui.Component.EventType.ACTION);
        menubar.getChildAt(0).dispatchEvent(goog.ui.Component.EventType.ACTION);
        expect(menubar.overlay_.isVisible()).toBe(false);
      });
      it('hides the menu', function() {
        menubar.getChildAt(0).dispatchEvent(goog.ui.Component.EventType.ACTION);
        menubar.getChildAt(0).dispatchEvent(goog.ui.Component.EventType.ACTION);
        expect(menubar.buttonsAndMenus_.get(goog.getUid(menubar.getChildAt(0))).isVisible()).toBe(false);
      });
    });
    describe('if the overlay is showing and is clicked', function() {
      it('hides the overlay', function() {
        menubar.getChildAt(0).dispatchEvent(goog.ui.Component.EventType.ACTION);
        goog.testing.events.fireClickEvent(menubar.overlay_.getElement());
        expect(menubar.overlay_.isVisible()).toBe(false);
      });
      it('hides the showing menu', function() {
        menubar.getChildAt(0).dispatchEvent(goog.ui.Component.EventType.ACTION);
        goog.testing.events.fireClickEvent(menubar.overlay_.getElement());
        expect(menubar.buttonsAndMenus_.get(goog.getUid(menubar.getChildAt(0))).isVisible()).toBe(false);
      });
    });
    describe('when one menu button is clicked, then a second', function() {
      it('displays the overlay', function() {
        var menu2 = new wtk.menubar.Menu('bar');
        menubar.addMenu(menu2);
        menubar.getChildAt(0).dispatchEvent(goog.ui.Component.EventType.ACTION);
        menubar.getChildAt(1).dispatchEvent(goog.ui.Component.EventType.ACTION);
        expect(menubar.overlay_.isVisible()).toBe(true);
      });
    });
    describe('when one menu button is clicked, then a second, and finally the overlay is clicked', function() {
      it('hides both menus', function() {
        var menu2 = new wtk.menubar.Menu('bar');
        menubar.addMenu(menu2);
        menubar.getChildAt(0).dispatchEvent(goog.ui.Component.EventType.ACTION);
        menubar.getChildAt(1).dispatchEvent(goog.ui.Component.EventType.ACTION);
        goog.testing.events.fireClickEvent(menubar.overlay_.getElement());
        expect(menubar.buttonsAndMenus_.get(goog.getUid(menubar.getChildAt(0))).isVisible()).toBe(false);
        expect(menubar.buttonsAndMenus_.get(goog.getUid(menubar.getChildAt(1))).isVisible()).toBe(false);
      });
    });
    describe('when the menu is displayed', function() {
      it('sets the menu top left position equal to button lower left position', function() {
        var button = menubar.getChildAt(0);
        button.dispatchEvent(goog.ui.Component.EventType.ACTION);
        var offset = goog.style.getPageOffset(button.getElement());
        var bounds = goog.style.getBounds(button.getElement());
        offset.y = offset.y + bounds.height;
        expect(menu.coordinate_.x).toBe(offset.x);
        expect(menu.coordinate_.y).toBe(offset.y);
      });
    });
  });
  describe('menuButton enter (hover)', function() {
    var menu1, menu2, button1, button2;
    beforeEach(function() {
      menubar.render();
      menu1 = new wtk.menubar.Menu('menu1');
      menu2 = new wtk.menubar.Menu('menu2');
      menubar.addMenu(menu1);
      menubar.addMenu(menu2);
      button1 = menubar.getChildAt(0);
      button2 = menubar.getChildAt(1);
    });
    describe('when menu1 is visible', function() {
      beforeEach(function() {
        button1.dispatchEvent(goog.ui.Component.EventType.ACTION);
      });
      describe('and button1 is not hovered over', function() {
        beforeEach(function() {
          button1.dispatchEvent(goog.ui.Component.EventType.LEAVE);
        });
        describe('and a button2 is hovered over', function() {
          beforeEach(function() {
            button2.dispatchEvent(goog.ui.Component.EventType.ENTER);
          });
          it('closes the menu1', function() {
            expect(menu1.isVisible()).toBe(false);
          });
          it('opens menu2', function() {
            expect(menu2.isVisible()).toBe(true);
          });
        });
      });
      describe('and an item within is clicked', function() {
        it('closes the menu', function() {
          var item = new wtk.menubar.MenuItem('foo', 'bar');
          menu1.addItem(item);
          item.dispatchEvent(goog.ui.Component.EventType.ACTION);
          expect(menu1.isVisible()).toBe(false);
        });
      });
    });
    describe('when no menus are visible', function() {
      beforeEach(function() {
        menubar.hideMenus_();
      });
      describe('hovering over a button', function() {
        it('does not display the menu', function() {
          button1.dispatchEvent(goog.ui.Component.EventType.ENTER);
          expect(menu1.isVisible()).toBe(false);
        });
      });
    });
  });
});