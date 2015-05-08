µSlider - a jQuery plugin.
==========================

![unmaintained](http://img.shields.io/badge/status-unmaintained-red.png)

A *micro*plugin for making a content sliding rotator.

### Usage ###

#### In your `<head>` ####

``` html
<script type="text/javascript" src="jquery.core.min.js"></script>
<script type="text/javascript" src="jquery.µSlider.min.js"></script>    
```
#### In your javascript ####

``` javascript
$(function () {
  window.mySlider = $('#mySlider').µSlider({
    directiion: 'vertical',
    speed: 1200,
    width: 240,
    height: 120,
    items: 8,
    prev: '.prev_button',
    next: '.next_button',
    easing: 'easeOutBounce',
    loop: false,
    page: 0,
    stop: function(){},
    change: function(){}
  });
});
```
#### It assumes ####
  
That your structure looks something like this:
 
``` html
<ul id="mySlider">
  <li>Panel 1</li>
  <li>Panel 2</li>
  <li>Panel 3</li>
  <li>Panel 4</li>
</ul>

```
      
and that you declare an explicit height and width the container.
