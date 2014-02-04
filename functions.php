<?php
wp_enqueue_script( 'key', $dir . '/js/key_shortcuts.js', array(), '1.18', true);//官方推荐的方式引入JS
wp_localize_script('key', 'Bigfa', array(
     "ajaxurl" => admin_url('admin-ajax.php')
));
add_action( 'wp_ajax_random_post', 'bigfa_random_post' );
add_action( 'wp_ajax_nopriv_random_post', 'bigfa_random_post' );
function bigfa_random_post() {
    $posts = get_posts('post_type=post&orderby=rand&numberposts=1');
    foreach($posts as $post) {
        $link = get_permalink($post);
    }
    echo $link;
    exit;
}
?>