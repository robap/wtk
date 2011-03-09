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

describe('wtk.menubar.MenuItem', function() {
  var menubarMenuItem;
  beforeEach(function() {
    menubarMenuItem = new wtk.menubar.MenuItem();
    menubarMenuItem.render();
  });
  afterEach(function() {
    menubarMenuItem.dispose();
  });
  describe('default state', function() {
    it('...', function() {
      
    });
  });
});