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

describe('wtk.util.Command', function() {
  var command;
  beforeEach(function() {
    command = new wtk.util.Command();
  });
  describe('#execute', function() {
    it('dispatches execute event', function() {
      var eventFired = false;
      goog.events.listenOnce(command, wtk.util.Command.EventType.EXECUTE, function() {
        eventFired = true;
      });
      command.execute();
      expect(eventFired).toBe(true);
    });
  });
});