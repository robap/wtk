// Copyright 2011 Robert Apodaca. All Rights Reserved.
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

goog.require('wtk.Dialog');
goog.require('goog.dom.query');
goog.require('goog.style');

describe('Dialog', function(){
  var dialog;
  
  beforeEach(function(){
    dialog = new wtk.Dialog();
  });
  afterEach(function(){
    dialog.dispose();
  });
  describe('dom', function(){
    it('Is in the dom when rendered', function(){
      dialog.render();
      expect(goog.dom.query(dialog.getElement()).length).toEqual(1);
    });
  });
  describe('#open', function(){
    describe('before #open is called', function(){
      it('Is not showing', function(){
        dialog.render();
        expect(goog.style.isElementShown(dialog.getElement())).toEqual(false);
      });
    });
    describe('after #open is called', function(){
      it('Is showing', function(){
        dialog.render();
        dialog.open();
        expect(goog.style.isElementShown(dialog.getElement())).toEqual(true);
      });
    });
  });
  describe('#close', function() {
    describe('before #close is called', function(){
      it('Is is showing', function(){
        dialog.render();
        expect(goog.style.isElementShown(dialog.getElement())).toEqual(false);
      });
    });
    describe('after #close is called', function(){
      it('Is not showing', function(){
        dialog.render();
        dialog.open();
        dialog.close();
        expect(goog.style.isElementShown(dialog.getElement())).toEqual(false);
      });
    });
  });
  describe('#setTitle', function(){
    it('sets title correctly', function(){
      var test_title = 'test title';
      dialog.setTitle(test_title);
      dialog.render();
      var dom_title = dialog.getElementByFragment(wtk.Dialog.IdFragment.TITLE).innerHTML;
      expect(dom_title).toEqual(test_title);
    });
  });
  describe('#setContent', function(){
    it('sets content correctly', function(){
      var test_content = 'test content';
      dialog.setContent(test_content);
      dialog.render();
      var dom_content = dialog.getElementByFragment(wtk.Dialog.IdFragment.CONTENT).innerHTML;
      expect(dom_content).toEqual(test_content);
    });
  });
  describe('actions', function() {
    describe('when rendered', function(){
      it('close click action is applied', function() {
        dialog.render();
        var close = dialog.getElementByFragment(wtk.Dialog.IdFragment.CLOSE);
        var listeners = goog.events.getListeners(close, goog.events.EventType.CLICK, false);
        expect(listeners.length).toEqual(1);
      });
    })
    describe('when disposed', function(){
      it('close click action is removed', function() {
        dialog.render();
        var close = dialog.getElementByFragment(wtk.Dialog.IdFragment.CLOSE);
        dialog.dispose();
        var listeners = goog.events.getListeners(close, goog.events.EventType.CLICK, false);
        expect(listeners.length).toEqual(0);
      });
    });
  });
});