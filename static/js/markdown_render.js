var isMobile = $.browser.mobile;

if (!isMobile) {
  var editorInfo;
  var padText;

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
        $.getScript('../static/plugins/ep_markdown_render/static/hallo/jquery-ui.js', function() {
          $.getScript('../static/plugins/ep_markdown_render/static/hallo/rangy-core.js', function() {
            $.getScript('../static/plugins/ep_markdown_render/static/hallo/hallo.js', function() {
            $.getScript('../static/plugins/ep_markdown_render/static/hallo/to-markdown.js', function() {
                $('#renderedcontainer').hallo({
                  plugins: {
                    'halloformat': {},
                    'halloheadings': {},
                    'halloblock': {},
                    'hallolists': {},
                    //'halloreundo': {}
                  },
                  editable: true,
                  toolbar: 'halloToolbarFixed' 
                });
                $('#renderedcontainer').bind('hallomodified', function(event, data) {
                   var markdown = toMarkdown(data.content);
                   if (padText == markdown) {
                     return;
                   }
                   editorInfo.ace_importText(markdown);
                });
              });
            });
          });
        });
    });
  };
  exports.documentReady = documentReady;

  var renderedOnce = false;

  var postAceInit = function(hook, context){
    $('#editorcontainer').before($('<div id="renderedcontainer"></div>'));
    $('#editorcontainer').css({ left: '50%' });
    $('#renderedcontainer').css({
      position: 'absolute',
      //top: $('#editorcontainer').css('top'),
      top: '50px',
      right: '50%',
      left: '10px',
      bottom: $('#editorcontainer').css('bottom'),
      "z-index": 1
    });
    renderedOnce = false;
    pad.changeViewOption('useMonospaceFont', true);
    $('#editbar .menu_left').hide();
  };
  exports.postAceInit = postAceInit;

  var aceEditEvent = function(hook, context) {
    var callstack = context.callstack;
    if (callstack
          && (!renderedOnce || callstack.repChanged)
          && context.editorInfo
          && marked
          && !(callstack.editEvent && (callstack.editEvent.eventType==='importText' || callstack.editEvent.eventType==='applyChangesToBase'))) {
      try {
        editorInfo = context.editorInfo;
        padText = editorInfo.ace_exportText();
        $('#renderedcontainer').html(marked(context.editorInfo.ace_exportText()));
        renderedOnce = true;
      } catch (err) {
        console.log("Error when rendering the Markdown markup.", err);
      }
    }
  };
  exports.aceEditEvent = aceEditEvent;
}

