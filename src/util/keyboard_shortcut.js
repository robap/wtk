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

goog.provide('wtk.util.KeyboardShortcut');

goog.require('goog.ui.Control');
goog.require('wtk.util.documentKeyboardShortcutHandler');

/**
 * @constructor
 * @extends {goog.ui.Control}
 */
wtk.util.KeyboardShortcut = function(identifier, var_args) {
  this.keyboardShortcutHandler_ = 
    wtk.util.documentKeyboardShortcutHandler.getInstance();
  
  this.keyIdentifier_ = identifier;
  this.keyboardShortcutHandler_.registerShortcut(this.keyIdentifier_, var_args);
  this.connectListeners_();
};
goog.inherits(wtk.util.KeyboardShortcut, goog.ui.Control);

/**
 * @private
 */
wtk.util.KeyboardShortcut.prototype.connectListeners_ = function() {
  goog.events.listen(this.keyboardShortcutHandler_,
    goog.ui.KeyboardShortcutHandler.EventType.SHORTCUT_TRIGGERED, 
    this.handleShortcutEvent_,
    false,
    this
  );
};

/**
 * @private
 */
wtk.util.KeyboardShortcut.prototype.handleShortcutEvent_ = function(event) {
  if(event.identifier === this.keyIdentifier_) {
    this.dispatchEvent(goog.ui.Component.EventType.ACTION);
  }
};