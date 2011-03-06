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
      it('creates a child component in the toolbar', function() {
        expect(toolbar.getChildAt(0)).not.toBeNull();
      });
      it('creates the child component whose innerHTML is foo', function() {
        expect(toolbar.getChildAt(0).getElement().innerHTML).toBe(menuName);
      });
    });
  });
});