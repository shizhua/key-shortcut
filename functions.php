<?php

add_action( 'wp_ajax_random_post', 'teo_random_post' );
add_action( 'wp_ajax_nopriv_random_post', 'teo_random_post' );

function teo_random_post() {
	$posts = get_posts('post_type=post&orderby=rand&numberposts=1');
    foreach($posts as $post) {
        $link = get_permalink($post);
    }
    echo $link;
    exit;
}
?>