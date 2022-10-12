=== Advanced Custom Fields: link_gtm Field ===
Contributors: Ondřej Šeliga
Tags: link, href, gtm, event
Requires at least: 4.9.0
Tested up to: 6.0.2
Stable tag: trunk
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

This plugins adds new field type called "Link with GTM event", which works as normal link, but adds GTM event input into WP Link dialog.

== Description ==

This plugins adds new field type called "Link with GTM event", which works as normal link, but adds GTM event input into WP Link dialog.
Value of the GTM event input is then returned under `gtm` key in an array along with `title`, `url` and `target`.


= Compatibility =

This ACF field type is compatible with:
* ACF 5

== Installation ==

1. Copy the `acf-link-gtm` folder into your `wp-content/plugins` folder
2. Activate the link_gtm plugin via the plugins admin page
3. Create a new field via ACF and select the "Link with GTM event" type
4. Add code to your template:

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

== Changelog ==

= 0.1 =
* Initial Release.