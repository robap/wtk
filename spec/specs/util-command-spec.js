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

goog.require('wtk.util.Command');

goog.require('goog.ui.Button');

describe('wtk.util.Command', function() {
  var command;
  beforeEach(function() {
    command = new wtk.util.Command();
  });
  describe('default', function() {
    it('is enabled', function() {
      expect(command.getEnable()).toBe(true);
    });
  });
  describe('#setEnabled', function() {
    it('sets using supplied boolean', function() {
      var enabled = false;
      command.setEnable(enabled);
      expect(command.getEnable()).toBe(false);
    });
    describe('disabling a command with Control attached', function() {
      var button;
      beforeEach(function() {
        button = new goog.ui.Button();
        command.attachControl(button);
        command.setEnable(false);
      })
      it('sets the Control state to disabled', function() {
        expect(button.hasState(goog.ui.Component.State.DISABLED)).toBe(true);
      });
    });
  });
  describe('#execute', function() {
    it('dispatches execute event when enabled', function() {
      var eventFired = false;
      command.setEnable(true);
      goog.events.listenOnce(command, wtk.util.Command.EventType.EXECUTE, function() {
        eventFired = true;
      });
      command.execute();
      expect(eventFired).toBe(true);
    });
    it('does not dispatch execute event when disabled', function() {
      var eventFired = false;
      command.setEnable(false);
      goog.events.listenOnce(command, wtk.util.Command.EventType.EXECUTE, function() {
        eventFired = true;
      });
      command.execute();
      expect(eventFired).toBe(false);
    });
  });
  describe('#attachControl', function() {
    var button;
    beforeEach(function() {
      button = new goog.ui.Button();
    });
    it("listens to the Control's ACTION event", function() {
      command.attachControl(button);
      var listener = goog.events.hasListener(button, goog.ui.Component.EventType.ACTION);
      expect(listener).toBe(true);
    });
    describe('attaching with different starting states of command', function() {
      it("enables the attached Control", function() {
        command.setEnable(true);
        command.attachControl(button);
        expect(button.hasState(goog.ui.Component.State.DISABLED)).toBe(false);
      });
      it("disabled the attached Control", function() {
        command.setEnable(false);
        command.attachControl(button);
        expect(button.hasState(goog.ui.Component.State.DISABLED)).toBe(true);
      });
    });
  });
});