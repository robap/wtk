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

goog.require('wtk.util.KeyboardShortcut');

goog.require('goog.testing');
goog.require('goog.testing.PropertyReplacer');

describe('wtk.util.KeyboardShortcut', function() {
  var shortcut, identifier, var_args, keycode, stubs;
  beforeEach(function() {
    stubs = new goog.testing.PropertyReplacer();
    stubs.replace(wtk.util.documentKeyboardShortcutHandler, 'getInstance', function() {
      return new wtk.util.documentKeyboardShortcutHandler();
    });
    identifier = 't';
    var_args = identifier;
    keycode = 84;
    shortcut = new wtk.util.KeyboardShortcut(identifier, var_args);
  });
  afterEach(function() {
    shortcut.dispose();
    stubs.reset();
  });
  describe('events', function() {
    var dispatched;
    beforeEach(function() {
      dispatched = false;
      goog.events.listen(shortcut, goog.ui.Component.EventType.ACTION, function() {
        dispatched = true;
      });
    });
    it('dispatches ACTION event when key is pressed', function() {
      goog.testing.events.fireKeySequence(document, keycode);
      expect(dispatched).toBe(true);
    });
    it('does not dispatch ACTION event when other key is pressed', function() {
      var otherKeyCode = 83;
      goog.testing.events.fireKeySequence(document, otherKeyCode);
      expect(dispatched).toBe(false);
    });
  });
});