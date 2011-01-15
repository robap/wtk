// This file was automatically generated from dialog.soy.
// Please don't edit this file by hand.

goog.provide('WTK.templates');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
WTK.templates.dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable"><div id="', soy.$$escapeHtml(opt_data.header_id), '" class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"><span class="ui-dialog-title" id="ui-dialog-title-dialog">Dialog Title</span><a href="#" id="', soy.$$escapeHtml(opt_data.close_id), '" class="ui-dialog-titlebar-close ui-corner-all" role="button"><span class="ui-icon ui-icon-closethick">close</span></a></div><div id="dialog" class="ui-dialog-content ui-widget-content" style="width: auto; min-height: 58.4px; height: auto;"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p></div></div>');
  if (!opt_sb) return output.toString();
};
