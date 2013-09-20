var isMobile = $.browser.mobile;

if (!isMobile) {
  var converter;
  $.getScript('../static/plugins/ep_markdown_render/static/pagedown/Markdown.Converter.js', function() {
    $.getScript('../static/plugins/ep_markdown_render/static/pagedown/Markdown.Sanitizer.js', function() {
      converter = Markdown.getSanitizingConverter();
      $.getScript('../static/plugins/ep_markdown_render/static/highlight.js/highlight.pack.js', function() {
        hljs.selected_languages = hljs.LANGUAGES;
      });
    });
  });

  var postAceInit = function(hook, context){
    $('#editorcontainer').before($('<div id="renderedcontainer"></div>'));
    $('#editorcontainer').css({ left: '50%' });
    $('#renderedcontainer').css({
      position: 'absolute',
      top: $('#editorcontainer').css('top'),
      right: '50%',
      left: '10px',
      bottom: $('#editorcontainer').css('bottom'),
      "z-index": 1
    });
  };
  exports.postAceInit = postAceInit;

  var editorInfo = null;

  var aceInitialized = function(hook, context) {
    editorInfo = context.editorInfo;
  };
  exports.aceInitialized = aceInitialized;

  var acePostWriteDomLineHTML = function(hook, context) {
    if (editorInfo) {
      try {
        $('#renderedcontainer').html(converter.makeHtml(editorInfo.ace_exportText()));
        $('#renderedcontainer pre code').each(function(idx, item) {
          hljs.highlightBlock(item);
        });
      } catch (err) {}
    }
  };
  exports.acePostWriteDomLineHTML = acePostWriteDomLineHTML;
}

