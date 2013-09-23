# ep_markdown_render

This is a plugin for [Etherpad](http://etherpad.org/) that treats the pad's content as Markdown markup and display it alongside the pad itself.

This relies on:

 * [Marked](https://github.com/chjj/marked)
 * [Highlight.js](http://softwaremaniacs.org/soft/highlight/en/)
 * [Hallo.js](http://hallojs.org/), which relies on:
   * [jQuery-UI](http://jqueryui.com/)
   * [jQuery-UI Bootstrap Theme](http://addyosmani.github.io/jquery-ui-bootstrap/)
   * [FontAwesome](http://fortawesome.github.io/Font-Awesome/)
   * [Rangy](http://code.google.com/p/rangy/)
 * [to-markdown](https://github.com/domchristie/to-markdown)



## Example

You can try it by writing something like this:

    #Welcome to Etherpad!
    
    This pad text is synchronized as you type, so that everyone viewing this page sees the same text.
    This allows you to collaborate seamlessly on documents!
    Get involved with [Etherpad](http://etherpad.org).
    
    You can even write code:
    
        public class MyClass {
            public static void main(String args[]) {
                System.out.println("Hello, World!");
            }
        }

