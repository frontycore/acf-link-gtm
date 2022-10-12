<?php

/*
Plugin Name: ACF Link field with GTM event
Plugin URI: 
Description: Link field with additional GTM event input in dialog for Advanced Custom Fields plugin.
Version: 0.1
Author: Ondřej Šeliga
Author URI: http://seliga.cz
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
*/

// exit if accessed directly
if( ! defined( 'ABSPATH' ) ) exit;


// check if class already exists
if( !class_exists('fronty_acf_plugin_link_gtm') ) :

class fronty_acf_plugin_link_gtm {
	
	// vars
	var $settings;

	
	/*
	*  __construct
	*
	*  This function will setup the class functionality
	*
	*  @type	function
	*  @date	17/02/2016
	*  @since	1.0.0
	*
	*  @param	void
	*  @return	void
	*/
	
	function __construct() {
		
		// settings
		// - these will be passed into the field class.
		$this->settings = array(
			'version'	=> '1.0.0',
			'url'		=> plugin_dir_url(__FILE__),
			'path'		=> plugin_dir_path(__FILE__)
		);
		
		
		// include field
		add_action('acf/include_field_types', array($this, 'include_field')); // v5
		// add_action('acf/register_fields', array($this, 'include_field')); // v4

		wp_enqueue_script('acf-link-gtm', plugin_dir_url(__FILE__) . 'assets/js/input.js', ['jquery', 'jquery-ui-sortable', 'jquery-ui-resizable', 'acf', 'acf-input'], $this->settings['version']);
		wp_enqueue_style('acf-link-gtm', plugin_dir_url(__FILE__) . 'assets/css/input.css', [], $this->settings['version']);
	}
	
	
	/*
	*  include_field
	*
	*  This function will include the field type class
	*
	*  @type	function
	*  @date	17/02/2016
	*  @since	1.0.0
	*
	*  @param	$version (int) major ACF version. Defaults to false
	*  @return	void
	*/
	
	function include_field( $version = false ) {

		// support empty $version
		if(!$version) $version = 5;

		
		// load textdomain
		// load_plugin_textdomain( 'link_gtm', false, plugin_basename( dirname( __FILE__ ) ) . '/lang' );

		// include
		include_once('fields/class-fronty-acf-field-link-gtm-v' . $version . '.php');
	}
	
}


// initialize
new fronty_acf_plugin_link_gtm();


// class_exists check
endif;
	
?>