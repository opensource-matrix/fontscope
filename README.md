# FontScope
FontScope is a library of completely free SVG icons for easy use in your HTML code.  It's super easy to use in your HTML code, just like this:

```html
<!DOCTYPE html>
<html>
    <head>
        <!-- ... -->
        <script src="fontspace.js"></script>
    </head>
    <body>
        <!-- ... -->
        <span id="test" class="icon-android" width="100px" height="100px"></span>
    </body>
</html>
```
Just add the image's file name (without `.svg`) class to your `span` tag.  If you want a list of the provided images, look through `images/`; it's where the SVG files are stored.

If you want to color your graphics, you can use the builtin color keyword classes:
```css
.magenta
.red
.orange
.yellow
.green
.blue
.indigo
.violet
```
Like this.
```html
<span id="test" class="icon-android green" width="100px" height="100px"></span>
```