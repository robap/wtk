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

goog.require('wtk.Dialog');
goog.require('wtk.Button');
goog.require('goog.style');

describe('Dialog', function(){
  var dialog;
  
  beforeEach(function(){
    dialog = new wtk.Dialog();
  });
  afterEach(function(){
    dialog.dispose();
  });
  describe('default state', function() {
    it('has a width of 300', function() {
      expect(dialog.getWidth()).toEqual(300);
    });
    it('has a height of 200', function() {
      expect(dialog.getHeight()).toEqual(200);
    });
    it('has a zIndex of 1000', function() {
      expect(dialog.getZIndex()).toEqual(1000);
    });
  });
  describe('#constructor', function() {
    var width, height;
    beforeEach(function() {
      width = 25;
      height = 46;
      dialog = new wtk.Dialog(width, height);
    });
    it('sets the width and height when supplied', function() {
      expect(dialog.getWidth()).toEqual(width);
      expect(dialog.getHeight()).toEqual(height);
    });
  });
  describe('#render', function(){
    it('Is added to the dom when rendered', function(){
      dialog.render();
      expect(dialog.isInDocument()).toEqual(true);
    });
    it('Is rendered with correct zIndex', function() {
      dialog.render();
      var z = goog.style.getStyle(dialog.getElement(), 'z-index');
      expect(z).toEqual('1000');
    });
  });
  describe('#canDecorate', function() {
    it('can not be decorated', function() {
      expect(dialog.canDecorate()).toEqual(false);
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
      it('Dispatches wtk.State.OPENED', function() {
        var event_detected = false;
        goog.events.listen(dialog, wtk.State.OPENED, function(){
          event_detected = true;
        });
        dialog.render();
        dialog.open();
        expect(event_detected).toEqual(true);
      });
    });
  });
  describe('#close', function() {
    describe('before #close is called', function(){
      it('Is showing', function(){
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
      it('Dispatches wtk.State.CLOSED', function() {
        var event_detected = false;
        goog.events.listen(dialog, wtk.State.CLOSED, function(){
          event_detected = true;
        });
        dialog.render();
        dialog.open();
        dialog.close();
        expect(event_detected).toEqual(true);
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
      it('close click listener is attached', function() {
        dialog.render();
        var close = dialog.getElementByFragment(wtk.Dialog.IdFragment.CLOSE);
        var listeners = goog.events.getListeners(close, goog.events.EventType.CLICK, false);
        expect(listeners.length).toEqual(1);
      });
    });
    describe('when disposed', function(){
      it('close click listener is removed', function() {
        dialog.render();
        var close = dialog.getElementByFragment(wtk.Dialog.IdFragment.CLOSE);
        dialog.dispose();
        var listeners = goog.events.getListeners(close, goog.events.EventType.CLICK, false);
        expect(listeners.length).toEqual(0);
      });
    });
    describe('#setPosition', function(){
      it('sets the element top and left css properties', function() {
        var left = 100;
        var top = 200;
        
        dialog.setPosition(left, top);
        dialog.render();
        dialog.open();
        
        var pos = goog.style.getPosition(dialog.getElement());
        
        expect(pos.x).toEqual(left);
        expect(pos.y).toEqual(top);
      });
    });
    describe('#enableModal', function() {
      it('adds overlay after open when true', function() {
        dialog.enableModal(true);
        dialog.render();
        dialog.open();
        var is_instance = (dialog.overlay_ instanceof wtk.Overlay);
        expect(is_instance).toBeTruthy();
      });
      it('removes the ovelay after close when false', function() {
        dialog.enableModal(true);
        dialog.render();
        dialog.open();
        dialog.close();
        expect(dialog.overlay_).toBeFalsy();
      });
    });
    describe('#addButton', function() {
      it('adds a button set to dialog with one child per button added', function() {
        dialog.addButton(new wtk.Button('test'));
        dialog.render();
        var button_set = dialog.getElementByFragment(wtk.Dialog.IdFragment.BUTTONSET);
        expect(button_set.childNodes.length).toBe(1);
      });
    });
    describe('#getButtonSet', function() {
      it('returns false when no buttons added', function() {
        dialog.render();
        expect(dialog.getButtonSet()).toBe(false);
      });
      it('returns instance of goog.ui.Component when buttons have been added', function() {
        dialog.render();
        dialog.addButton(new wtk.Button('test'));
        expect(dialog.getButtonSet() instanceof goog.ui.Component).toBe(true);
      });
    });
    describe('#hasButtons', function() {
      describe('when no buttons have been added', function() {
        it('returns false', function() {
          expect(dialog.hasButtons()).toBeFalsy();
        });
      });
      describe('when buttons have been added', function() {
        it('returns true when buttons have been added', function() {
          dialog.addButton(new wtk.Button('test'));
          expect(dialog.hasButtons()).toBeTruthy();
        });
      });
    });
  });
});