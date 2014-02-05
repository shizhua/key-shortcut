; (function($) {
	var h = $.scrollTo = function(a, b, c) {
		$(window).scrollTo(a, b, c)
	};
	h.defaults = {
		axis: 'xy',
		duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
		limit: true
	};
	h.window = function(a) {
		return $(window)._scrollable()
	};
	$.fn._scrollable = function() {
		return this.map(function() {
			var a = this,
			isWin = !a.nodeName || $.inArray(a.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1;
			if (!isWin) return a;
			var b = (a.contentWindow || a).document || a.ownerDocument || a;
			return /webkit/i.test(navigator.userAgent) || b.compatMode == 'BackCompat' ? b.body: b.documentElement
		})
	};
	$.fn.scrollTo = function(e, f, g) {
		if (typeof f == 'object') {
			g = f;
			f = 0
		}
		if (typeof g == 'function') g = {
			onAfter: g
		};
		if (e == 'max') e = 9e9;
		g = $.extend({},
		h.defaults, g);
		f = f || g.duration;
		g.queue = g.queue && g.axis.length > 1;
		if (g.queue) f /= 2;
		g.offset = both(g.offset);
		g.over = both(g.over);
		return this._scrollable().each(function() {
			if (e == null) return;
			var d = this,
			$elem = $(d),
			targ = e,
			toff,
			attr = {},
			win = $elem.is('html,body');
			switch (typeof targ) {
			case 'number':
			case 'string':
				if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
					targ = both(targ);
					break
				}
				targ = $(targ, this);
				if (!targ.length) return;
			case 'object':
				if (targ.is || targ.style) toff = (targ = $(targ)).offset()
			}
			$.each(g.axis.split(''),
			function(i, a) {
				var b = a == 'x' ? 'Left': 'Top',
				pos = b.toLowerCase(),
				key = 'scroll' + b,
				old = d[key],
				max = h.max(d, a);
				if (toff) {
					attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]);
					if (g.margin) {
						attr[key] -= parseInt(targ.css('margin' + b)) || 0;
						attr[key] -= parseInt(targ.css('border' + b + 'Width')) || 0
					}
					attr[key] += g.offset[pos] || 0;
					if (g.over[pos]) attr[key] += targ[a == 'x' ? 'width': 'height']() * g.over[pos]
				} else {
					var c = targ[pos];
					attr[key] = c.slice && c.slice( - 1) == '%' ? parseFloat(c) / 100 * max: c
				}
				if (g.limit && /^\d+$/.test(attr[key])) attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
				if (!i && g.queue) {
					if (old != attr[key]) animate(g.onAfterFirst);
					delete attr[key]
				}
			});
			animate(g.onAfter);
			function animate(a) {
				$elem.animate(attr, f, g.easing, a &&
				function() {
					a.call(this, e, g)
				})
			}
		}).end()
	};
	h.max = function(a, b) {
		var c = b == 'x' ? 'Width': 'Height',
		scroll = 'scroll' + c;
		if (!$(a).is('html,body')) return a[scroll] - $(a)[c.toLowerCase()]();
		var d = 'client' + c,
		html = a.ownerDocument.documentElement,
		body = a.ownerDocument.body;
		return Math.max(html[scroll], body[scroll]) - Math.min(html[d], body[d])
	};
	function both(a) {
		return typeof a == 'object' ? a: {
			top: a,
			left: a
		}
	}
})(jQuery);
//let's get it started
jQuery(document).ready(function() {
	var event2key = {
		'97': 'a',
		'98': 'b',
		'99': 'c',
		'100': 'd',
		'101': 'e',
		'102': 'f',
		'103': 'g',
		'104': 'h',
		'105': 'i',
		'106': 'j',
		'107': 'k',
		'108': 'l',
		'109': 'm',
		'110': 'n',
		'111': 'o',
		'112': 'p',
		'113': 'q',
		'114': 'r',
		'115': 's',
		'116': 't',
		'117': 'u',
		'118': 'v',
		'119': 'w',
		'120': 'x',
		'121': 'y',
		'122': 'z',
		'37': 'left',
		'39': 'right',
		'38': 'up',
		'40': 'down',
		'13': 'enter'
	};

	var documentKeys = function(event) {
		if (jQuery(event.target).is("textarea, input")) return true;
		var keycode = event.which || event.keyCode; // par exemple : 112
		var myKey = event2key[keycode]; // par exemple : 'p'
		switch (myKey) {
		case 'r'://get a random post
			jQuery.post(Bigfa.ajaxurl, {
				action: 'random_post',
			},
			function(data) {
				window.location.href = data;
			});
			break;
		case 'j'://previous post
			var prev = jQuery('.nav-single .nav-previous a');

			if (prev.length) {
				window.location.href = prev.attr("href");
			} else {
				scrollTop = jQuery(window).scrollTop();
				jQuery(jQuery('article.post').get().reverse()).each(function(i, article) {
					var articletop = jQuery(article).offset().top;
					if (scrollTop > articletop - 90) {
						//we have the previous post
						jQuery.scrollTo(articletop - 90, 400); //we go to that previous post
						return false; //we exit
					}
				});
			}
			break;
		case 'k'://next post
			var next = jQuery('.nav-single .nav-next a');

			if (next.length) {
				window.location.href = next.attr("href");
			} else {
				scrollTop = jQuery(window).scrollTop();
				jQuery('article.post').each(function(i, article) {
					var articletop = jQuery(article).offset().top;
					if (scrollTop < articletop - 100) {
						//we have the next post
						jQuery.scrollTo(articletop - 90, 400); //we go to that next post
						return false; //we exit
					}
				});
			}
			break;
		case 'c'://go to comment field
			var singlecomments = jQuery('.single .post #comments');
			if (singlecomments.length) {
				jQuery.scrollTo(jQuery('#comments'), 400);
				return false;
			} else {
				scrollTop = jQuery(window).scrollTop();
				jQuery(jQuery('article.post').get().reverse()).each(function(i, article) {
					var articletop = jQuery(article).offset().top;
					if (scrollTop > articletop - 90) {
						//we have the previous post
						var link = jQuery(article).find('h1 a').attr("href");
						window.location.href = link + '#comments';
						return false; //we exit
					}
				});
			}
			break;
		case 'v'://view post if not in a single page
			var singlecomments = jQuery('body.single');
			if (singlecomments.length) {
				return false;
			} else {
				scrollTop = jQuery(window).scrollTop();
				jQuery(jQuery('article.post').get().reverse()).each(function(i, article) {
					var articletop = jQuery(article).offset().top;
					if (scrollTop > articletop - 70) {
						//we have the previous post
						var link = jQuery(article).find('h1 a').attr("href");
						window.location.href = link;
						return false; //we exit
					}
				});
			}
			break;
		case 'q'://back to home page
			var home = jQuery('body .site-title a');
			if (home.length) {
				window.location.href = home.attr("href");
			}
			break;
		case 'h'://back to top
			$("body,html").animate({
				scrollTop:
				0
			},
			800),
			!1
		}
	};
	jQuery(document).on('keydown keyup keypress', documentKeys);
	jQuery(document).on("click", ".keyboard",
	function() {
		jQuery('.modal-content').show();
		jQuery('body').append('<div class="overlay"></div>');
	});
	jQuery(document).on("click", ".overlay",
	function() {
		jQuery('.overlay').remove();
		jQuery('.modal-content').hide();
	});
});