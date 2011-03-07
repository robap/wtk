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


goog.require('wtk.toolbar.Toolbar');
goog.require('wtk.toolbar.Menu');

goog.require('goog.dom.classes');
goog.require('goog.testing.events');

describe('wtk.toolbar.Toolbar', function() {
  var toolbar;
  beforeEach(function() {
    toolbar = new wtk.toolbar.Toolbar();
  });
  afterEach(function() {
    toolbar.dispose();
  })
  describe('CSS classes', function() {
    beforeEach(function() {
      toolbar.render();
    });
    it('contains ui-state-default', function() {
      expect(goog.dom.classes.get(toolbar.getElement())).toContain('ui-state-default');
    });
  });
  describe('Adding a menu', function() {
    var menu, menuName;
    beforeEach(function() {
      toolbar.render();
      menuName = 'foo';
      menu = new wtk.toolbar.Menu(menuName);
      toolbar.addMenu(menu);
    });
    describe('with name foo', function(){
      it('creates a MenuButton with name foo in the toolbar', function() {
        var menuButton = toolbar.getChildAt(0);
        expect(menuButton.getContent()).toBe(menuName);
      });
      it('adds the menu to the menu container', function() {
        expect(toolbar.menuContainer_.getChildAt(0)).toBe(menu);
      });
      it('gives the menu its own zIndex value', function() {
        expect(menu.zIndex_).toBe(toolbar.getZIndex());
      });
    });
  });
  describe('menuButton action', function() {
    var menu;
    beforeEach(function() {
      toolbar.render();
      menu = new wtk.toolbar.Menu('foo');
      toolbar.addMenu(menu);
    });
    describe('when the button action fires once', function() {
      it('displays the overlay', function() {
        toolbar.getChildAt(0).dispatchEvent(goog.ui.Component.EventType.ACTION);
        expect(toolbar.overlay_.isVisible()).toBe(true);
      });
      it('displays the corresponding menu', function() {
        toolbar.getChildAt(0).dispatchEvent(goog.ui.Component.EventType.ACTION);
        expect(toolbar.buttonsAndMenus_.get(goog.getUid(toolbar.getChildAt(0))).isVisible()).toBe(true);
      });
    });
    describe('when the button action fires twice', function() {
      it('hides the overlay', function() {
        toolbar.getChildAt(0).dispatchEvent(goog.ui.Component.EventType.ACTION);
        toolbar.getChildAt(0).dispatchEvent(goog.ui.Component.EventType.ACTION);
        expect(toolbar.overlay_.isVisible()).toBe(false);
      });
      it('hides the menu', function() {
        toolbar.getChildAt(0).dispatchEvent(goog.ui.Component.EventType.ACTION);
        toolbar.getChildAt(0).dispatchEvent(goog.ui.Component.EventType.ACTION);
        expect(toolbar.buttonsAndMenus_.get(goog.getUid(toolbar.getChildAt(0))).isVisible()).toBe(false);
      });
    });
    describe('if the overlay is showing and is clicked', function() {
      it('hides the overlay', function() {
        toolbar.getChildAt(0).dispatchEvent(goog.ui.Component.EventType.ACTION);
        goog.testing.events.fireClickEvent(toolbar.overlay_.getElement());
        expect(toolbar.overlay_.isVisible()).toBe(false);
      });
      it('hides the showing menu', function() {
        toolbar.getChildAt(0).dispatchEvent(goog.ui.Component.EventType.ACTION);
        goog.testing.events.fireClickEvent(toolbar.overlay_.getElement());
        expect(toolbar.buttonsAndMenus_.get(goog.getUid(toolbar.getChildAt(0))).isVisible()).toBe(false);
      });
    });
    describe('when one menu button is clicked, then a second', function() {
      it('displays the overlay', function() {
        var menu2 = new wtk.toolbar.Menu('bar');
        toolbar.addMenu(menu2);
        toolbar.getChildAt(0).dispatchEvent(goog.ui.Component.EventType.ACTION);
        toolbar.getChildAt(1).dispatchEvent(goog.ui.Component.EventType.ACTION);
        expect(toolbar.overlay_.isVisible()).toBe(true);
      });
    });
    describe('when one menu button is clicked, then a second, and finally the overlay is clicked', function() {
      it('hides both menus', function() {
        var menu2 = new wtk.toolbar.Menu('bar');
        toolbar.addMenu(menu2);
        toolbar.getChildAt(0).dispatchEvent(goog.ui.Component.EventType.ACTION);
        toolbar.getChildAt(1).dispatchEvent(goog.ui.Component.EventType.ACTION);
        goog.testing.events.fireClickEvent(toolbar.overlay_.getElement());
        expect(toolbar.buttonsAndMenus_.get(goog.getUid(toolbar.getChildAt(0))).isVisible()).toBe(false);
        expect(toolbar.buttonsAndMenus_.get(goog.getUid(toolbar.getChildAt(1))).isVisible()).toBe(false);
      });
    });
    describe('when the menu is displayed', function() {
      it('sets the menu top left position equal to button lower left position', function() {
        var button = toolbar.getChildAt(0);
        button.dispatchEvent(goog.ui.Component.EventType.ACTION);
        var offset = goog.style.getPageOffset(button.getElement());
        var bounds = goog.style.getBounds(button.getElement());
        offset.y = offset.y + bounds.height;
        expect(menu.coordinate_.x).toBe(offset.x);
        expect(menu.coordinate_.y).toBe(offset.y);
      });
    });
  });
});