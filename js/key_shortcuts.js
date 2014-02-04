jQuery(document).ready(function() {
        var event2key = {'97':'a', '98':'b', '99':'c', '100':'d', '101':'e', '102':'f', '103':'g', '104':'h', '105':'i', '106':'j', '107':'k', '108':'l', '109':'m', '110':'n', '111':'o', '112':'p', '113':'q', '114':'r', '115':'s', '116':'t', '117':'u', '118':'v', '119':'w', '120':'x', '121':'y', '122':'z', '37':'left', '39':'right', '38':'up', '40':'down', '13':'enter'};

        var documentKeys = function(event) {
            if (jQuery(event.target).is("textarea, input") ) return true;
            var keycode = event.which || event.keyCode; // par exemple : 112
            var myKey = event2key[keycode]; // par exemple : 'p'

            switch (myKey) {
                case 'r':
                    jQuery.post(MyAjax.ajaxurl, {
                        action : 'random_post',
                        }, function(data) {
                            window.location.href = data;
                    });
                    break;
                case 'j':
                    var prev = jQuery('.single-navigation .prev a');

                    if(prev.length) {
                        window.location.href = prev.attr("href");
                    }
                    else {
                        scrollTop = jQuery(window).scrollTop();
                        jQuery(jQuery('article.post').get().reverse()).each(function(i, article) { 
                            var articletop = jQuery(article).offset().top;
                            if ( scrollTop > articletop - 90 ) { 
                                //we have the previous post
                                jQuery.scrollTo( articletop - 90, 400); //we go to that previous post
                                return false; //we exit
                            }
                        });
                    }
                    break;
                case 'k':
                    var next = jQuery('.single-navigation .next a');
                    
                    if(next.length) {
                        window.location.href = next.attr("href");
                    }
                    else {
                        scrollTop = jQuery(window).scrollTop();
                        jQuery('article.post').each(function(i, article) { 
                            var articletop = jQuery(article).offset().top;
                            if ( scrollTop < articletop - 100 ) { 
                                //we have the next post
                                jQuery.scrollTo( articletop - 90, 400); //we go to that next post
                                return false; //we exit
                            }
                        });
                    }
                    break;
                case 'c':
                    var singlecomments = jQuery('.single .post .comments');
                    if(singlecomments.length) {
                        jQuery.scrollTo(jQuery('.comments-counter'), 400);
                        return false;
                    }
                    else { 
                        scrollTop = jQuery(window).scrollTop();
                        jQuery(jQuery('article.post').get().reverse()).each(function(i, article) { 
                            var articletop = jQuery(article).offset().top;
                            if ( scrollTop > articletop - 90 ) { 
                                //we have the previous post
                                var link = jQuery(article).find('.comments a').attr("href");
                                window.location.href = link;
                                return false; //we exit
                            }
                        });
                    }
                    break;
                case 'v':
                    var singlecomments = jQuery('body.single');
                    if(singlecomments.length) {
                        return false;
                    }
                    else { 
                        scrollTop = jQuery(window).scrollTop();
                        jQuery(jQuery('article.post').get().reverse()).each(function(i, article) { 
                            var articletop = jQuery(article).offset().top;
                            if ( scrollTop > articletop - 70 ) { 
                                //we have the previous post
                                var link = jQuery(article).find('h1 a').attr("href");
                                window.location.href = link;
                                return false; //we exit
                            }
                        });
                    }
                    break;
                case 'h':
                    $("body,html").animate({
		scrollTop: 0
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