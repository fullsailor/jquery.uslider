(function ($) {
	var VERTICAL = 'vertical';
	var HORIZONTAL = 'horizontal';

	function limits(value, min, max) {
		TODO: implement limits()
		
	}
	
	jQuery.fn.µSlider = function (options) {
		if (!(options.width && options.height && options.items)) {
			return false;
		}
		var options = $.extend({
			direction: VERTICAL,
			speed: 400,
			easing: 'swing',
			prev: '.next',
			next: '.prev',
			loop: false,
			page: 0
		}, options);
		
		// ============== INITIALIZATION
		
		var that = this.eq(0);
		var orig = this;
		
		var blocks = Math.ceil( $(that).children('li').length / options.items ) - 1; // -1 to use 0 based numbering
		
		var curpos = 0;
		
		var ui;
		if(options.page > blocks) {
			curpos = blocks;
		} else if (options.page < 0){
			curpos = 0;
		} else {
			cupos = options.page;
		}
		
		var swidth = (options.direction === VERTICAL)? options.width : options.width * (blocks+1);
		var sheight = (options.direction === VERTICAL)? options.height * (blocks+1) : options.height;
		
		$(that).wrapInner('<div class="uSlider"></div>');
		var slider = $(that).children('.uSlider');
		slider.css({
			position: 'absolute',
			top: (options.direction === VERTICAL)?-(curpos*options.height):0,
			left: (options.direction === VERTICAL)?0:-(curpos*options.width),
			margin: 0,
			padding: 0,
			border: 'none',
			width : swidth,
			height : sheight,
			stop: function (){},
			change: function (){}
		});
		
		$(that).css({
			position: 'relative',
			listStyle: 'none',
			overflow: 'hidden',
			width: options.width,
			height: options.height
		});
		
		slider.children('li').css('float', 'left');
		
		if(options.loop === false) {
			if(curpos === 0) {
				$(options.prev).not('.nohide').css({visibility:'hidden', opacity:0});
			} else if (curpos === blocks) {
				$(options.next).not('.nohide').css({visibility:'hidden', opacity:0});
			}
		}
		
		
		// ============== EVENT SETUP
		
		
		
		var prevfn = function () {
			if(options.loop === false) {
				$(options.next)
					.not('.nohide')
					.css({visibility:'visible'})
					.animate({opacity: 1})
				;
			}
			
			ui = {
				page: curpos,
				dir : 'prev',
				sender : this
			}
			
			if (curpos > 0) {
				curpos--;
				if(curpos <= 0) {
					curpos = 0;
					options.change(ui);
					if(options.loop===false) {
						$(options.prev).not('.nohide').animate({opacity:0}, function() {
							$(options.prev).not('.nohide').css({visibility:'hidden'});
						});
					}
				}
			} else if (options.loop === true) {
				curpos = blocks;
			}
			if(options.direction == VERTICAL) {
				slider.stop(true).animate({
					top: -(curpos*options.height)
				}, options.speed, options.easing, function () { options.stop(ui); });
			} else {
				slider.stop(true).animate({
					left: -(curpos*options.width)
				}, options.speed, options.easing, function () { options.stop(ui); });
			}
			return false;
		};
		
		var nextfn = function () {
			if(options.loop === false) {
				$(options.prev)
					.not('.nohide')
					.css({visibility:'visible'})
					.animate({opacity: 1})
				;
			}
			
			ui = {
				page: curpos,
				dir : 'prev',
				sender : this
			}
			
			if (curpos < blocks) {
				curpos++;
				if(curpos >= blocks) {
					curpos = blocks;
					options.change(ui);
					if(options.loop===false) {
						$(options.next).not('.nohide').animate({opacity:0}, function() {
							$(options.next).not('.nohide').css({visibility:'hidden'});
						});
					}
				}
			} else if (options.loop === true) {
				curpos = 0;
			}
			if(options.direction == VERTICAL) {
				slider.stop(true).animate({
					top: -(curpos*options.height)
				}, options.speed, options.easing, function () { options.stop(ui); });
			} else {
				slider.stop(true).animate({
					left: -(curpos*options.width)
				}, options.speed, options.easing, function () { options.stop(ui); });
			}
			return false;
		};
		
		$(options.prev).click(prevfn);
		$(options.next).click(nextfn);
		
		
		// ============== PUBLIC API
		
		this.goto = function (page) {
			if (curpos > page) {
				curpos = page+1;
				prevfn();
			} else if (curpos < page) {
				curpos = page-1;
				nextfn();
			}
		};
		
		this.get = function () {
			return {
				page: curpos,
				max: blocks,
				options: options
			}
		}
		return this;
	};
	
})(jQuery);