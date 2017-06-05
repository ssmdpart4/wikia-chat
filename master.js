;(function(mw, $, mainRoom, toolbar){
	/**
	 * [Object] toolbar
	 * This object represents the configurations
	 * used on the toolbar that will be created.
	 **/
	
	toolbar = $.extend(toolbar, {
		/**
		 * [Boolean] toolbar.collapsible
		 * This value determines whether the toolbar is collapsible.
		 * @default false
		 **/
		collapsible: false,
		/**
		 * [Boolean] toolbar.collapsed
		 * This value determines whether the toolbar is collapsed by
		 * default. Will only when the toolbar is collapsible.
		 **/
		collapsed: false,
		/**
		 * [Function] toolbar.ui
		 * This function creates the user interface for the toolbar.
		 * @params
		 * - type: specifies the type of a UI element
		 * - config: specifies the options used for the UI element (optional)
		 **/
		ui: function(type, id, config){
			// This variable represents the valid types
			var canonical_types = ['colorbox', 'combobox', 'list', 'input', 'button']
			if (canonical_types.indexOf(type) === -1){
				throw new ReferenceError('The type that you have chosen is not valid. The valid types are ' + canonical_types.join(', ') + '.');
			}
			
			try {
				this.type = type;
				this.id = id;
				this.data = {};
				switch (type){
					case 'colorbox':
						this.color = '#000000';
						this.element = $('<nav class="chat-ui colorbox" />');
						this.palette = [
								['#000000', '#1a1a1a', '#2a2a2a', '#3f3f3f', '#5d5d5d', '#808080', '#adadad', '#ffffff'],
								['#1a0000', '#2d0000', '#4e0000', '#6a0000', '#800000', '#af0000', '#c40000', '#ff0000'],
								['#001a00', '#002d00', '#004e00', '#006a00', '#008000', '#00af00', '#00c400', '#00ff00'],
								['#00001a', '#00002d', '#00004e', '#00006a', '#000080', '#0000af', '#0000c4', '#0000ff']
							];
						if (typeof config != 'undefined'){
							this.color = config.color;
							this.palette = config.palette;
						}
						this.create = function(callback){
							var $colorbox = this.element,
								that = this;
							$colorbox.html(function(){
								var $color = $('<div class="colorbox-color color" />'),
									$color_module = $('<section class="colorbox-module color-module" />');
								$color_module.html([
									$('<div class="colorbox-section left" />')
										.html([
											$('<div class="colorbox-color color large" />')
										]),
									$('<div class="colorbox-section right" />')
										.html([
											$('<div class="colorbox-palette-wrapper palette-wrapper" />')
												.html(
													Array.prototype.map.call(that.palette, function(row, index){
														var $palette_row = $('<ul class="palette-row row" />');
														$palette_row.html(
															Array.prototype.map.call(row, function(_color, i){
																var $color = $('<li class="palette-color color" />');
																$color.attr('data-color', _color);
																$color.css('background-color', _color);
																$color.on('click', function(event){
																	
																});
																return $color;
															})
														}
													})
												)
										])
								]);
							});
						};
						return this;
					case 'combobox':
					case 'list':
					case 'input':
					case 'button':
					default:
						return;
			} catch (e){
				throw new Error(e);
			}
		}
	});
})(this.mediaWiki, this.jQuery, this.mainRoom, this.ChatToolbar = this.ChatToolbar || {});
