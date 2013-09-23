
exports.eejsBlock_styles = function (hook_name, args, cb)
{
  args.content = args.content
    + '<link href="../static/plugins/ep_markdown_render/static/css/markdown_render.css" rel="stylesheet">'
    + '<link href="../static/plugins/ep_markdown_render/static/hallo/fontawesome/css/font-awesome.css" rel="stylesheet">'
    + '<link href="../static/plugins/ep_markdown_render/static/hallo/jquery-ui-bootstrap/custom-theme/jquery-ui-1.10.0.custom.css" rel="stylesheet">'
    + '<link href="../static/plugins/ep_markdown_render/static/hallo/hallo.css" rel="stylesheet">'
    + '<link href="../static/plugins/ep_markdown_render/static/highlight.js/styles/default.css" rel="stylesheet">';
} 
