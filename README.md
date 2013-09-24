# ep_markdown_render

This is a plugin for [Etherpad](http://etherpad.org/) that treats the pad's content as Markdown markup and display it alongside the pad itself. This uses the [main Markdown syntax](http://daringfireball.net/projects/markdown/syntax) with the [GitHub extensions](https://help.github.com/articles/github-flavored-markdown).

This relies on:

 * [Marked](https://github.com/chjj/marked)
 * [Highlight.js](http://softwaremaniacs.org/soft/highlight/en/)
 * [MathJax](http://www.mathjax.org/) (optional)
 
## MathJax installation

MathJax is a system that allows you to write mathematical symbols and equations. It is a project with a number of files, so it is not bunlded with this project. To use it, you need to configure one of these two options:
    
* Option 1: use the [MathJax CDN](http://docs.mathjax.org/en/latest/start.html#mathjax-cdn). Uncomment the "MathJax Option 1" section in the code (`./static/js/markdown_render.js`, in `documentReady`). As far as I understand, the MathJax project is keen for people to use their CDN, but you'll need to check their terms and conditions. (There might also be privacy concerns with the `Referer` header.)
* Option 2: install MathJax locally. Unpack the MathJax distribution in `./static/mathjax/` (in such a way that the main script is at `./static/mathjax/MathJax.js`).

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
    
    And tables:
    
    | Left-aligned | Centred | Right-aligned |
    | ------------ |:-------:| -------------:|
    | Item 1       |       £ |   10          |
    | Item 2       |       € |   10          |
    
    Here is an example using MathJax (if you've configured it):
    
    * Centred displayed equation: $$f(x) = \sum_{i=1}^{N}{x^2}$$
    
    * In-line: \\( f(x) = \sum_{i=1}^{N}{x^2} \\)
    
    
    How does MathJax work in the code? (This shouldn't turn into math.)
    
    ```no-highlight
    \\( \sum_{i=1}^{N}{x^2} \\)
    
    $$\sum_{i=1}^{N}{x^2}$$
    ```

