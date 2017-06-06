;(function(mw, $, mainRoom, toolbar) {
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
		 * - type: specifies the type of the UI element
		 * - id: specifies the ID of the UI element
		 * - config: specifies the options used for the UI element (optional)
		 **/
		ui: function(type, id, config){
			// This variable represents the valid types
			var canonical_types = ['colorbox', 'combobox', 'list', 'input', 'button', 'tooltip'];
			if (canonical_types.indexOf(type) === -1) {
				throw new ReferenceError('The type that you have chosen is not valid. The valid types are ' + canonical_types.join(', ') + '.');
			}

			try {
				this.type = type;
				this.id = id;
				this.data = {};
				switch (type) {
					case 'colorbox':
						this.color = '#000000';
						this.element = $('<nav class="chat-ui colorbox" />');
						this.palette = [
								['#000000', '#1a1a1a', '#2a2a2a', '#3f3f3f', '#5d5d5d', '#808080', '#adadad', '#ffffff'],
								['#1a0000', '#2d0000', '#4e0000', '#6a0000', '#800000', '#af0000', '#c40000', '#ff0000'],
								['#001a00', '#002d00', '#004e00', '#006a00', '#008000', '#00af00', '#00c400', '#00ff00'],
								['#00001a', '#00002d', '#00004e', '#00006a', '#000080', '#0000af', '#0000c4', '#0000ff']
							];
						if (typeof config != 'undefined') {
							this.color = config.color || '#000000';
							this.palette = config.palette || [
								['#000000', '#1a1a1a', '#2a2a2a', '#3f3f3f', '#5d5d5d', '#808080', '#adadad', '#ffffff'],
								['#1a0000', '#2d0000', '#4e0000', '#6a0000', '#800000', '#af0000', '#c40000', '#ff0000'],
								['#001a00', '#002d00', '#004e00', '#006a00', '#008000', '#00af00', '#00c400', '#00ff00'],
								['#00001a', '#00002d', '#00004e', '#00006a', '#000080', '#0000af', '#0000c4', '#0000ff']
							];
						}
						this.create = function(){
							var $colorbox = this.element,
							    that = this;
							$colorbox.attr('id', this.id);
							$colorbox.html(function(){
								var $color = $('<div class="colorbox-color color" />'),
									$color_module = $('<section class="colorbox-module color-module" />');
								$color.css('background-color', that.color).on('click', function(){
									$('#' + that.id).show();
								});
								$color_module.html([
									$('<div class="colorbox-section left" />')
										.html([
											$('<div class="colorbox-color color large" id="color-large" />')
												.css('background-color', that.color)
										]),
									$('<div class="colorbox-section right" />')
										.html([
											$('<div class="colorbox-palette-wrapper palette-wrapper palette" id="colorbox-palette" />')
											.html(
												Array.prototype.map.call(that.palette, function(row, index){
													var $palette_row = $('<ul class="palette-row row" />');
													$palette_row.addClass('row-' + index);
													$palette_row.html(
														Array.prototype.map.call(row, function (_color, i) {
															var $color = $('<li class="palette-color color" />');
															$color.attr('data-color', _color);
															$color.addClass('color-' + index + '-' + i);
															$color.css('background-color', _color);
															$color.on('click', function (event) {
																var $color_large = $('#color-large'),
																	color_value = $(event.target).attr('data-color');
																$('.palette-color.selected').removeClass('selected');
																$(event.target).addClass('selected');
																$color_large.css('background-color', color_value);
															});
															$color.addClass(function(){
																if ($(this).attr('data-color') == that.color) {
																	return 'selected';
																}
															});
															return $color;
														})
													);
												})
											),
										$('<div class="colorbox-input" id="colorbox-input" />')
											.html([
												$('<label for="color-input" class="colorbox-input-label" />')
													.html('Custom Color: '),
												$('<input type="text" id="color-input" placeholder="Enter hex here..." />')
													.on('keypress', function(e){
														if (!(e.which == 13 || e.keyCode == 13 || e.key == 'Enter')) return;
														var _color = $(e.target).val();
														if (/#([0-9a-f]{3}|[0-9a-f]{6})/.test(_color)) {
															var $target = $('#color-large');
															$target.css('background-color', _color);
															$target.attr('data-color', _color);
														} else {
															throw new ReferenceError('The value must be a hex triplet.');
														}
													})
												])
											]),
										$('<div class="colorbox-submit" id="colorbox-submit" />')
											.html(function(){
												var UI = that.constructor,
													button = new UI('button', 'colorbox-submit-button');
												button.action = function(event){
													var $_colorbox = $('#' + that.id),
														$selected = $_colorbox.find('.selected');
													$_colorbox.removeClass('active');
													$_colorbox.find('> .color').css('background-color', $selected.attr('data-color');
													$_colorbox.find('.color-module').hide();
												};
												return button.create();
											})
										]);
								$color_module.hide();
								return [$color, $color_module];
							});
							return $colorbox;
						};
						return this;
					case 'combobox':
						this.items = [];
						this.element = $('<nav class="chat-ui combobox" />');
						this.limit = Infinity;
						if (typeof config != 'undefined'){
							this.items = config.items || [];
							this.grouped = (typeof config.items == 'object' && config.items instanceof Object);
							this.limit = config.limit || Infinity;
						}
						this.create = function(){
							var that = this,
								$combobox = this.element;
							$combobox.attr('id', this.id);
							$combobox.html(function(){
								var $comboinput = $('<input type="text" class="combobox-input" />'),
									$drop = $('<span class="combobox-drop combobox-arrow" />'),
									$combolist = $('<div class="combobox-list" />');
								$combolist.html(function(){
									var $html = null;
									if (that.grouped){
										$html = Object.keys(that.items).map(function(name, index){
											var _class = 'combobox-group-' + index,
												_items = that.items[name],
												$group = $('<section class="combobox-group ' + _class + '" />');
											$group.html([
												$('<h3 class="combobox-group-heading" />')
													.html(name),
												$('<ul class="combobox-list combobox-group-list" />')
													.html(
														Array.prototype.map.call(_items, function(item, i){
															var $item = $('<li class="combobox-item combobox-list-item" />');
															$item.html(
																$('<a href="#" data-target="#' + that.id + ' .combobox-input" class="combobox-item" /')
														});
													)
											]);
											return $group;
										});
									} else {
									}
							});
							return $combobox;
						};
						return this;
					case 'list':
					case 'input':
					case 'button':
					case 'tooltip':
					default:
						return;
				}
			} catch (e){
				throw new Error(e);
			}
		}
	});
})(this.mediaWiki, this.jQuery, this.mainRoom, this.ChatToolbar = this.ChatToolbar || {});
