var isMobile = $.browser.mobile;


var mathJaxEnabled = false;

var documentReady = function(hook, context) {
  $.getScript('../static/plugins/ep_markdown_render/static/marked/marked.js', function() {
      marked.setOptions({
        gfm: true,
        highlight: function (code, lang, callback) {
          try {
            if (lang) {
              return hljs.highlight(lang, code).value;
            } else {
              return hljs.highlightAuto(code).value;
            }
          } catch (err) {
            return code;
          }
        },
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false,
        langPrefix: 'lang-'
      });

      $.getScript('../static/plugins/ep_markdown_render/static/highlight.js/highlight.pack.js', function() {
        hljs.selected_languages = hljs.LANGUAGES;
      });


      /*
      // MathJax Option 1 (CDN):
      //
      // You can use the MathJax CDN, but check the terms of service.
      // * http://docs.mathjax.org/en/latest/start.html#mathjax-cdn
      // * http://www.mathjax.org/download/mathjax-cdn-terms-of-service/
      // According to some comments, the MathJax project seems to encourage
      // the use of its CDN.
      $.getScript('http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML', function() {
        mathJaxEnabled = true;
      });
      // End of MathJax Option 1
      */
      // MathJax Option 2 (Local installation):
      //
      // Alternatively, install a local copy in the ./static/mathjax directory.
      $.ajax({
        url: '../static/plugins/ep_markdown_render/static/mathjax/MathJax.js',
        dataType: "script",
        cache: true,
        success: function() {
          MathJax.Hub.config.root = '../static/plugins/ep_markdown_render/static/mathjax';
          $.ajax({
            url: '../static/plugins/ep_markdown_render/static/mathjax/config/TeX-AMS-MML_HTMLorMML.js',
            dataType: "script",
            cache: true,
            success: function() {
              mathJaxEnabled = true;
            }
          });
        }
      });
      // End of MathJax Option 2
  });
};
exports.documentReady = documentReady;



var renderedOnce = false;

var aceEditEvent = function(hook, context) {
  var callstack = context.callstack;
  if (callstack
        && (!renderedOnce || callstack.docTextChanged)
        && context.editorInfo
        && marked) {
    try {
        $('#renderedcontent').html(marked(context.editorInfo.ace_exportText()));
        renderedOnce = true;
        if (mathJaxEnabled) {
          var math = document.getElementById("renderedcontent");
          MathJax.Hub.Queue(["Typeset",MathJax.Hub,math]);
        }
    } catch (err) {
      console.log("Error when rendering the Markdown markup.", err);
    }
  }
};
exports.aceEditEvent = aceEditEvent;


if (isMobile) {
  var postAceInit = function(hook, context){
    $('#editorcontainer').before($('<div id="renderedcontainer"><div style="position: relative; height: 100%;"><div id="renderedcontent"></div></div></div>'));
    $('#renderedcontainer').css({
      position: 'absolute',
      top: $('#editorcontainer').css('top'),
      right: '0px',
      left: '0px',
      bottom: $('#editorcontainer').css('bottom'),
      "z-index": 1
    });
    $('#editorcontainer').hide();
    renderedOnce = false;
    pad.changeViewOption('useMonospaceFont', true);
    $('#editbar .menu_left').hide();

    $('#view-as-markdown').on('click', function() {
      if ($('#view-as-markdown').prop('checked')) {
        $('#editorcontainer').show();
        $('#renderedcontainer').hide();
      } else {
        $('#editorcontainer').hide();
        $('#renderedcontainer').show();
      }
    });
  };
  exports.postAceInit = postAceInit;
} else {
  var postAceInit = function(hook, context){
    $('#editorcontainer').before($('<div id="renderedcontainer"><div style="position: relative; height: 100%;"><div id="renderedcontent"></div></div></div>'));
    $('#editorcontainer').css({ left: '50%', width: '50%' });
    $('#renderedcontainer').css({
      position: 'absolute',
      top: $('#editorcontainer').css('top'),
      right: '50%',
      left: '0px',
      width: 'auto',
      bottom: $('#editorcontainer').css('bottom'),
      "z-index": 1
    });
    $('#renderedcontent').css({
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      "z-index": 1,
      padding: '8px',
      overflow: 'scroll'
    });
    renderedOnce = false;
    pad.changeViewOption('useMonospaceFont', true);
    $('#editbar .menu_left').hide();
    $('#view-as-markdown-block').hide();
  };
  exports.postAceInit = postAceInit;
}
