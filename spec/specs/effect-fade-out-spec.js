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

goog.require('wtk.effects.FadeOut');
goog.require('goog.ui.Component');

describe('Effect FadeOut', function(){
  var fx, component;
  beforeEach(function() {
    fx = new wtk.effects.FadeOut(1);
    component = new goog.ui.Component();
    component.render();
  });
  afterEach(function() {
    component.dispose();
  });
  describe('#createAnimation', function() {
    it('returns instance of goog.fx.dom.FadeOut', function() {
      var anim = fx.createAnimation(component);
      expect(anim instanceof goog.fx.dom.FadeOut).toEqual(true);
    });
  });
});