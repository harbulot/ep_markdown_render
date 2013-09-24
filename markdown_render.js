var eejs = require('ep_etherpad-lite/node/eejs/');
exports.eejsBlock_mySettings = function (hook_name, args, cb) {
  args.content = args.content + eejs.require("ep_markdown_render/templates/mySettings.ejs");
  return cb();
}

exports.eejsBlock_styles = function (hook_name, args, cb)
{
  args.content = args.content
    + '<link href="../static/plugins/ep_markdown_render/static/css/markdown_render.css" rel="stylesheet">'
    + '<link href="../static/plugins/ep_markdown_render/static/highlight.js/styles/default.css" rel="stylesheet">';
} 
