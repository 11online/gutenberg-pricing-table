<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since 	1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * `wp-blocks`: includes block type registration and related functions.
 *
 * @since 1.0.0
 */
function gutenberg_pop_up_block_assets() {
	wp_enqueue_script(
		'gutenberg_pop_up-block-bootstrap-js', // Handle.
		plugins_url( '/bootstrap-modal.min.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ) // Dependencies, defined above.
		// filemtime( plugin_dir_path( __FILE__ ) . 'block.js' ) // Version: filemtime — Gets file modification time.
	);
	wp_enqueue_script(
		'block-party-pop-up-velocity',
		"//cdnjs.cloudflare.com/ajax/libs/velocity/1.2.2/velocity.min.js",
		array( 'jquery' )
	);
	wp_enqueue_script(
		'block-party-pop-up-velocity-ui',
		"//cdnjs.cloudflare.com/ajax/libs/velocity/1.2.2/velocity.ui.min.js",
		array( 'jquery', 'block-party-pop-up-velocity' )
	);
	wp_enqueue_script(
		'block-party-pop-up-animations',
		plugins_url( '/animations.js', dirname(__FILE__) ),
		array( 'jquery', 'block-party-pop-up-velocity', 'block-party-pop-up-velocity-ui' )
	);
	wp_enqueue_style(
		'gutenberg_pop_up-block-editor-bootstrap-css', // Handle.
		plugins_url( 'bootstrap-modal.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' ) // Version: filemtime — Gets file modification time.
	);
} // End function gutenberg_pop_up_cgb_block_assets().

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'gutenberg_pop_up_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * `wp-blocks`: includes block type registration and related functions.
 * `wp-element`: includes the WordPress Element abstraction for describing the structure of your blocks.
 * `wp-i18n`: To internationalize the block's text.
 *
 * @since 1.0.0
 */
function gutenberg_pop_up_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'gutenberg_pop_up-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ) // Dependencies, defined above.
		// filemtime( plugin_dir_path( __FILE__ ) . 'block.js' ) // Version: filemtime — Gets file modification time.
	);
} // End function gutenberg_pop_up_cgb_editor_assets().

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'gutenberg_pop_up_editor_assets' );
