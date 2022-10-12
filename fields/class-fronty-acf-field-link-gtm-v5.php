<?php

// exit if accessed directly
if( ! defined( 'ABSPATH' ) ) exit;


// check if class already exists
if( !class_exists('fronty_acf_field_link_gtm') ) :


class fronty_acf_field_link_gtm extends acf_field_link {


	/**
	 * @inheritDoc
	 */
	public function initialize() {
		// name (string) Single word, no spaces. Underscores allowed
		$this->name = 'link_gtm';

		// label (string) Multiple words, can include spaces, visible when selecting a field type
		$this->label = __('Link with GTM event', 'link_gtm');

		// category (string) basic | content | choice | relational | jquery | layout | CUSTOM GROUP NAME
		$this->category = 'relational';
	}

	/**
	 * @inheritdoc
	 */
	public function __construct(array $settings) {
		// settings (array) Store plugin settings (url, path, version) as a reference for later use with assets
		$this->settings = $settings;

		// do not delete!
		parent::__construct();
	}

	/**
	 * @inheritDoc
	 */
	public function get_link($value = ''): array
	{
		return array_merge([
			'gtm' => ''
		], parent::get_link($value));
	}

	public function render_field($field)
	{
		$div = [
			'id' => $field['id'],
			'class' => $field['class'] . ' acf-link',
		];

		acf_enqueue_uploader();

		$link = $this->get_link($field['value']);

		if ($link['url']) $div['class'] .= ' -value';
		if ($link['target'] === '_blank') $div['class'] .= ' -external';
		?>
<div <?php echo acf_esc_attrs( $div ); ?>>

<div class="acf-hidden">
	<a class="link-node" href="<?php echo esc_url($link['url']) ?>" target="<?php echo esc_attr($link['target']) ?>" data-gtm="<?php echo esc_attr($link['gtm']) ?>"><?php echo esc_html($link['title']) ?></a>
	<?php
	foreach ($link as $k => $v) {
		acf_hidden_input(
			array(
				'class' => "input-$k",
				'name'  => $field['name'] . "[$k]",
				'value' => $v,
			)
		);
	}
	?>
</div>

<a href="#" class="button" data-name="add" target=""><?php _e('Select Link', 'acf'); ?></a>

<div class="link-wrap">
	<span class="link-title"><?php echo esc_html($link['title']); ?></span>
	<a class="link-url" href="<?php echo esc_url($link['url']); ?>" target="_blank"><?php echo esc_html($link['url']); ?></a>
	<i class="acf-icon -link-ext acf-js-tooltip" title="<?php _e('Opens in a new window/tab', 'acf'); ?>"></i><a class="acf-icon -pencil -clear acf-js-tooltip" data-name="edit" href="#" title="<?php _e( 'Edit', 'acf' ); ?>"></a><a class="acf-icon -cancel -clear acf-js-tooltip" data-name="remove" href="#" title="<?php _e('Remove', 'acf'); ?>"></a>
</div>

</div>
		<?php

	}

	/**
	 * @inheritDoc
	 */
	public function get_rest_schema(array $field)
	{
		return [
			'type' => ['object', 'null'],
			'required' => ! empty($field['required']),
			'properties' => [
				'title' => [
					'type' => 'string',
				],
				'url' => [
					'type' => 'string',
					'required' => true,
					'format' => 'uri',
				],
				'target' => [
					'type' => 'string',
				],
				'gtm' => [
					'type' => 'string',
				],
			],
		];
	}
}


// initialize
new fronty_acf_field_link_gtm( $this->settings );


// class_exists check
endif;

?>