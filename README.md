# ACF Link with GTM event Field

Custom field type for [Advanced Custom Field](https://www.advancedcustomfields.com/) Wordpress plugin.

This plugins adds new field type called "Link with GTM event", which works as normal link, but adds GTM event input into WP Link dialog.

Value of the GTM event input is then returned under `gtm` key in an array along with `title`, `url` and `target`.

## How to work with this

1. In your WP admin under Custom fields, create a field group with new field of `Link with GTM event` type.

2. In the code of your template or plugin where you'd like to render a link HTML:

```php
<?php
/**
 * Returns somethink like:
 * 	[
 * 		'title' => 'My GTM link',
 * 		'url' => 'https://google.com',
 * 		'target' => '_blank',
 * 		'gtm' => 'clickOnGoogle'
 * 	]
 */
$link = get_field('myGtmLink');
?>
<a
	href="<?php echo $link['title'] ?>"
	<?php if ($target = $link['target']) echo 'target="' . $target . '"' ?>
	<?php if ($gtm = $link['gtm']) echo "onclick=\"dataLayer.push({'event': 'InteractionUI' 'eventCategory': 'Button','eventAction': 'Click','eventLabel': '','eventValue': '$eventValue'});\"" ?>
>
	<?php echo $link['title'] ?>
</a>
```