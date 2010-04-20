µSlider - a jQuery plugin.
==========================

A _micro_plugin for making an sliding rotator.

### Usage ###

#### In your `<head>` ####
    
    <script type="text/javascript" src="jquery.core.min.js"></script>
    <script type="text/javascript" src="jquery.µSlider.min.js"></script>
    
#### In your javascript ####

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

      setTimeout(function () {
        dss1.goto(2);
        console.log(dss1.get().page);
        }, 1000);
    });
    
#### It assumes ####
  
  That your structure looks something like this
  
      <ul id="mySlider">
        <li>Panel 1</li>
        <li>Panel 2</li>
        <li>Panel 3</li>
        <li>Panel 4</li>
      </ul>
      
  That you declare an explicit height and width the container.