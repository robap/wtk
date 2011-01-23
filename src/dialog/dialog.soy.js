// This file was automatically generated from dialog.soy.
// Please don't edit this file by hand.

goog.provide('wtk.templates');

goog.require('soy');
goog.require('soy.StringBuilder');


/**
 * @param {Object.<string, *>=} opt_data
 * @param {soy.StringBuilder=} opt_sb
 * @return {string|undefined}
 * @notypecheck
 */
wtk.templates.dialog = function(opt_data, opt_sb) {
  var output = opt_sb || new soy.StringBuilder();
  output.append('<div id="', soy.$$escapeHtml(opt_data.widget_id), '" class="ui-dialog ui-widget ui-widget-content ui-corner-all ui-draggable" style="position: absolute; width: ', soy.$$escapeHtml(opt_data.width), 'px; height: ', soy.$$escapeHtml(opt_data.height), 'px;"><div id="', soy.$$escapeHtml(opt_data.header_id), '" class="ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"><span class="ui-dialog-title" id="', soy.$$escapeHtml(opt_data.title_id), '"></span><a href="#" id="', soy.$$escapeHtml(opt_data.close_id), '" class="ui-dialog-titlebar-close ui-corner-all" role="button"><span class="ui-icon ui-icon-closethick">close</span></a></div><div id="', soy.$$escapeHtml(opt_data.content_id), '" class="ui-dialog-content ui-widget-content" style="width: auto; min-height: 58.4px; height: auto;"></div></div>');
  if (!opt_sb) return output.toString();
};
