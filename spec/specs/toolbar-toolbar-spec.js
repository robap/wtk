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
      console.log(goog.dom.classes.get(toolbar.getElement()))
      expect(goog.dom.classes.get(toolbar.getElement())).toContain('ui-state-default');
    });
  });
});