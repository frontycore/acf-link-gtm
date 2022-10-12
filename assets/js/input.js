(function($){
	var Field = acf.Field.extend({
    type: 'link_gtm',
    events: {
      'click a[data-name="add"]': 'onClickEdit',
      'click a[data-name="edit"]': 'onClickEdit',
      'click a[data-name="remove"]': 'onClickRemove',
      'change .link-node': 'onChange'
    },
    $control: function () {
      return this.$('.acf-link');
    },
    $node: function () {
      return this.$('.link-node');
    },
    getValue: function () {
      // vars
      var $node = this.$node(); // return false if empty

      if (!$node.attr('href')) {
        return false;
      } // return

      return {
        title: $node.html(),
        url: $node.attr('href'),
        target: $node.attr('target'),
        gtm: $node.attr('data-gtm'),
      };
    },
    setValue: function (val) {
      // default
      val = acf.parseArgs(val, {
        title: '',
        url: '',
        target: '',
				gtm: ''
      }); // vars

      var $div = this.$control();
      var $node = this.$node(); // remove class

      $div.removeClass('-value -external'); // add class

      if (val.url) $div.addClass('-value');
      if (val.target === '_blank') $div.addClass('-external'); // update text

      this.$('.link-title').html(val.title);
      this.$('.link-url').attr('href', val.url).html(val.url); // update node

      $node.html(val.title);
      $node.attr('href', val.url);
      $node.attr('target', val.target); // update inputs
      $node.attr('data-gtm', val.gtm); // update inputs

      this.$('.input-title').val(val.title);
      this.$('.input-target').val(val.target);
      this.$('.input-gtm').val(val.gtm);
      this.$('.input-url').val(val.url).trigger('change');
    },
    onClickEdit: function (e, $el) {
      acf.wpLinkGtm.open(this.$node());
    },
    onClickRemove: function (e, $el) {
      this.setValue(false);
    },
    onChange: function (e, $el) {
      // get the changed value
      var val = this.getValue(); // update inputs

      this.setValue(val);
    }
  });
  acf.registerFieldType(Field); // manager


	acf.wpLinkGtm = new acf.Model({
    getNodeValue: function () {
      var $node = this.get('node');
      return {
        title: acf.decode($node.html()),
        url: $node.attr('href'),
        target: $node.attr('target'),
				gtm: $node.attr('data-gtm')
      };
    },
    setNodeValue: function (val) {
      var $node = this.get('node');
      $node.text(val.title);
      $node.attr('href', val.url);
      $node.attr('target', val.target);
      $node.attr('data-gtm', val.gtm);
      $node.trigger('change');
    },
    getInputValue: function () {
      return {
        title: $('#wp-link-text').val(),
        url: $('#wp-link-url').val(),
        target: $('#wp-link-target').prop('checked') ? '_blank' : '',
				gtm: $('#wp-link-gtm').val()
      };
    },
    setInputValue: function (val) {
      $('#wp-link-text').val(val.title);
      $('#wp-link-url').val(val.url);
      $('#wp-link-target').prop('checked', val.target === '_blank');
			$('#wp-link-gtm').val(val.gtm);
    },
    open: function ($node) {
      // add events
      this.on('wplink-open', 'onOpen');
      this.on('wplink-close', 'onClose'); // set node

      this.set('node', $node); // create textarea

      var $textarea = $('<textarea id="acf-link-textarea" style="display:none;"></textarea>');
      $('body').append($textarea); // vars

      var val = this.getNodeValue(); // open popup

			$('#wp-link-wrap').addClass('gtmLinkWrap');
			$('#link-options').append('<div id="wp-link-gtm-wrap"><label><span>GTM událost</span><input type="text" id="wp-link-gtm" value="' + val.gtm + '"></label></div>');

      wpLink.open('acf-link-textarea', val.url, val.title, null);
    },
    onOpen: function () {
      // always show title (WP will hide title if empty)
      $('#wp-link-wrap').addClass('has-text-field'); // set inputs

      var val = this.getNodeValue();
      this.setInputValue(val); // Update button text.

      if (val.url && wpLinkL10n) {
        $('#wp-link-submit').val(wpLinkL10n.update);
      }
    },
    close: function () {
      wpLink.close();
    },
    onClose: function () {
			$('#wp-link-wrap').removeClass('gtmLinkWrap');

      // Bail early if no node.
      // Needed due to WP triggering this event twice.
      if (!this.has('node')) {
				$('#wp-link-gtm-wrap').remove();
        return false;
      } // Determine context.


      var $submit = $('#wp-link-submit');
      var isSubmit = $submit.is(':hover') || $submit.is(':focus'); // Set value

      if (isSubmit) {
        var val = this.getInputValue();
        this.setNodeValue(val);
      } // Cleanup.

			$('#wp-link-gtm-wrap').remove();
      this.off('wplink-open');
      this.off('wplink-close');
      $('#acf-link-textarea').remove();
      this.set('node', null);
    }
  });

	
// 	/**
// 	*  initialize_field
// 	*
// 	*  This function will initialize the $field.
// 	*
// 	*  @date	30/11/17
// 	*  @since	5.6.5
// 	*
// 	*  @param	n/a
// 	*  @return	n/a
// 	*/
	
// 	function initialize_field( $field ) {
		
// 		//$field.doStuff();
		
// 	}
	
	
// 	if( typeof acf.add_action !== 'undefined' ) {
	
// 		/*
// 		*  ready & append (ACF5)
// 		*
// 		*  These two events are called when a field element is ready for initizliation.
// 		*  - ready: on page load similar to $(document).ready()
// 		*  - append: on new DOM elements appended via repeater field or other AJAX calls
// 		*
// 		*  @param	n/a
// 		*  @return	n/a
// 		*/
		
// 		acf.add_action('ready_field/type=link_gtm', initialize_field);
// 		acf.add_action('append_field/type=link_gtm', initialize_field);
		
		
// 	} else {
		
// 		/*
// 		*  acf/setup_fields (ACF4)
// 		*
// 		*  These single event is called when a field element is ready for initizliation.
// 		*
// 		*  @param	event		an event object. This can be ignored
// 		*  @param	element		An element which contains the new HTML
// 		*  @return	n/a
// 		*/
		
// 		$(document).on('acf/setup_fields', function(e, postbox){
			
// 			// find all relevant fields
// 			$(postbox).find('.field[data-field_type="link_gtm"]').each(function(){

// 				// initialize
// 				initialize_field( $(this) );
				
// 			});

// 		});

// 	}

})(jQuery);
