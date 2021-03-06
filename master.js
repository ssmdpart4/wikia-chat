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
		 * @default false
		 **/
		collapsed: false,
		/**
		 * [Function] toolbar.collapse
		 * This function allows the toolbar to collapse (if it is collapsible)
		 **/
		collapse: function(){
			var $main = $('section#WikiaPage'),
				$toolbar = $('#ChatToolbar');
			$toolbar.animate({
				'bottom': '-40px'
			}, 500);
			$main.animate({
				'bottom': 0
			}, 500);
		},
		/**
		 * [Function] toolbar.expand
		 * This function allows the toolbar to expand (if it is collapsible)
		 **/
		expand: function(){
			var $main = $('section#WikiaPage'),
				$toolbar = $('#ChatToolbar');
			$toolbar.animate({
				'bottom': 0
			}, 500);
			$main.animate({
				'bottom': '40px'
			}, 500);
		},
		/**
		 * [Object] toolbar.items
		 * This object creates the layout for the toolbar
		 **/
		items: $.extend(toolbar.items, {
			'Customize': {
				id: 'toolbar-customize',
				handler: function(event){
					var $item = $(event.target).parent('#toolbar-customize');
					if (!$('#CustomizeModule').exists()){
						toolbar.createGlobalModule(function(){
							var $gm_html = [],
							    $header = $('<h2 class="global-module-heading" />'),
							    $content = $('<div class="global-module-content" />');
							$header.html($(event.target).text());
							$content.html(function(){
								var $fonts = $('<section class="global-module-section gm-section" id="chat-fonts" />'),
									$bg_color = $('<section class="global-module-section gm-section" id="chat-bgcolor" />'),
									$fg_color = $('<section class="global-module-section gm-section" id="text-color" />'),
									$user_color = $('<section class="global-module-section gm-section" id="user-color" />'),
									$mod_color = $('<section class="global-module-section gm-section" id="mod-color" />'),
									$self_color = $('<section class="global-module-section gm-section" id="self-color" />'),
									data = {
										font: '',
										background: '',
										text: '',
										user: '',
										mod: '',
										self: ''
									};
								
								var _fonts = {
										'Sans Serif': ['Helvetica', 'Segoe UI', 'Comic Sans', 'Impact', 'Lucida Sans', 'Arial', 'Trebuchet MS', 'Verdana', 'Franklin Gothic', 'Agency FB', 'Century Gothic', 'Gill Sans MT'],
										'Serif': ['Book Antiqua', 'Baskerville', 'Calisto MT', 'Garamond', 'Georgia', 'Palatino Linotype', 'Times New Roman'],
										'Monospaced': ['Fixedsys', 'Consolas', 'Courier', 'Lucida Console'],
										'Script': ['Mistral', 'Brush Script', 'Monotype Corsiva', 'Script MT Bold', 'Old English Text MT', 'Lucida Handwriting'],
										'Display': ['Broadway', 'Algerian', 'Cooper Black', 'Stencil', 'Balloon']
									},
									fonts = new toolbar.ui('combobox', 'fonts-box', {
										items: _fonts
									}),
									background = new toolbar.ui('colorbox', 'bg-select'),
									text = new toolbar.ui('colorbox', 'text-color-select'),
									user = new toolbar.ui('colorbox', 'user-color-select'),
									mod = new toolbar.ui('colorbox', 'mod-color-select'),
									self_post = new toolbar.ui('colorbox', 'self-color-select');
								$fonts.html([
									$('<h3 class="global-module-section-heading gm-section-heading" />')
										.html('Font: '),
									$('<div class="global-module-section-content gm-section-content" />')
										.html(function(){
											return fonts.create();
										})
								]);
								$bg_color.html([
									$('<h3 class="global-module-section-heading gm-section-heading" />')
										.html('Background Color: '),
									$('<div class="global-module-section-content gm-section-content" />')
										.html(function(){
											return background.create();
										})
								]);
								$fg_color.html([
									$('<h3 class="global-module-section-heading gm-section-heading" />')
										.html('Text Color: '),
									$('<div class="global-module-section-content gm-section-content" />')
										.html(function(){
											return text.create();
										})
								]);
								$user_color.html([
									$('<h3 class="global-module-section-heading gm-section-heading" />')
										.html('User Color: '),
									$('<div class="global-module-section-content gm-section-content" />')
										.html(function(){
											return user.create();
										})
								]);
								$mod_color.html([
									$('<h3 class="global-module-section-heading gm-section-heading" />')
										.html('Mod Color: '),
									$('<div class="global-module-section-content gm-section-content" />')
										.html(function(){
											return mod.create();
										})
								]);
								$self_color.html([
									$('<h3 class="global-module-section-heading gm-section-heading" />')
										.html('Self-Post Color: '),
									$('<div class="global-module-section-content gm-section-content" />')
										.html(function(){
											return self_post.create();
										})
								]);
								return [$fonts, $bg_color, $fg_color, $user_color, $mod_color, $self_color];
							});
							
							$gm_html = [$header, $content];
							return $gm_html;
						}, $item, 'CustomizeModule');
					} else {
						var $gm = $('#CustomizeModule'),
							height = null;
						if ($gm.is(':hidden')){
							height = $gm.css({
								'display': 'block'
							}).height();
							
							$gm.css({
								'overflow': 'hidden',
								'top': '-100%',
								'height': 0
							}).animate({
								'top': '100%',
								'height': height,
							}, 200, function(){
								$(this).css({
									'display': '',
									'overflow': '',
									'height': '',
									'top': ''
								});
							});
						} else {
							height = $gm.height();
							
							$gm.css({
								'overflow': 'hidden',
								'top': '100%',
								'height': height
							}).animate({
								'top': '-100%',
								'height': 0
							}, 200, function(){
								$(this).css({
									'display': 'none',
									'top': '',
									'height': '',
									'overflow': ''
								});
							});
						}
					}
				}
			}
		}),
		/**
		 * [Function] toolbar.showGlobalModule
		 * This function creates a global module for the toolbar
		 * @params
		 * - html: represents the HTML that will go on the global module
		 **/
		createGlobalModule: function(html, parent, id) {
			var $gm = $('<section class="global-module subnav" />');
			if (typeof id !== undefined)
				$gm.attr('id', id);
			$gm.html(html);
			parent.append($gm);
		},
		/**
		 * [Object] toolbar.data
		 * This object contains the data that will be stored
		 **/
		data: {
		},
		/**
		 * [Function] toolbar.ui
		 * This function creates the user interface for the toolbar.
		 * @params
		 * - type: specifies the type of the UI element
		 * - id: specifies the ID of the UI element
		 * - config: specifies the options used for the UI element (optional)
		 **/
		ui: function(type, id, config) {
			// This variable represents the valid types
			const canonical_types = ['colorbox', 'combobox', 'list', 'input', 'button', 'switch', 'tooltip'];
			if (canonical_types.indexOf(type) === -1) {
				throw new ReferenceError('The type that you have chosen is not valid. The valid types are ' + canonical_types.join(', ') + '.');
			}

			try {
				// Universal properties
				this.type = type;
				this.id = id;
				this.data = {}; // Scrapped. Kept for compatibility and storage purposes.
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
						this.create = function() {
							var $colorbox = this.element,
								that = this;
							$colorbox.attr('id', this.id);
							$colorbox.html(function() {
								var $color = $('<div class="colorbox-color color" />'),
									$color_module = $('<section class="colorbox-module color-module" />');
								$color.css('background-color', that.color).on('click', function(e_) {
									$('.colorbox-module').slideToggle(500);
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
											Array.prototype.map.call(that.palette, function(row, index) {
												var $palette_row = $('<ul class="palette-row row" />');
												$palette_row.addClass('row-' + index);
												$palette_row.html(
													Array.prototype.map.call(row, function(_color, i) {
														var $color = $('<li class="palette-color color" />');
														$color.attr('data-color', _color);
														$color.addClass('color-' + index + '-' + i);
														$color.css('background-color', _color);
														$color.on('click', function(event) {
															var $color_large = $('#color-large'),
																color_value = $(event.target).attr('data-color');
															$('.palette-color.selected').removeClass('selected');
															$(event.target).addClass('selected');
															$color_large.css('background-color', color_value);
															$color_large.attr('data-color', color_value);
														});
														$color.addClass(function() {
															if ($(this).attr('data-color') == that.color) {
																return 'selected';
															}
														});
														return $color;
													})
												);
												return $palette_row;
											})
										),
										$('<div class="colorbox-input" id="colorbox-input" />')
										.html([
											$('<label for="color-input" class="colorbox-input-label" />')
											.html('Custom Color: '),
											$('<input type="text" id="color-input" placeholder="Enter hex here..." />')
											.on('keypress', function(e) {
												if (!(e.which == 13 || e.keyCode == 13 || e.key == 'Enter')) return;
												var _color = $(e.target).val();
												if (/#([0-9a-f]{3}|[0-9a-f]{6})/.test(_color)) {
													var $target = $('#color-large');
													$target.css('background-color', _color);
													$target.attr('data-color', _color);
												} else if (/([0-9a-f]{3}|[0-9a-f]{6})/.test(_color)) {
													var $target = $('#color-large');
													$target.css('background-color', '#' + _color);
													$target.attr('data-color', '#' + _color);
												} else {
													throw new ReferenceError('The value must be a hex triplet.');
												}
											})
										])
									]),
									$('<div class="colorbox-submit" id="colorbox-submit" />')
									.html(function() {
										var UI = that.constructor,
											button = new UI('button', 'colorbox-submit-button', {
												text: 'Submit',
												_default: true
											});
										button.action = function(event) {
											var $_colorbox = $('#' + that.id),
												$selected = $_colorbox.find('.color.large');
											$_colorbox.removeClass('active');
											$_colorbox.find('> .color').css('background-color', $selected.attr('data-color'));
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
						this.getValue = function() {
							var $elem = $('#' + this.id),
								$target = $elem.find('.colorbox-color'),
								value = $target.attr('data-color');
							if (typeof value !== 'string') {
								return '';
							} else {
								return value;
							}
						};
						return this;
					case 'combobox':
						this.items = [];
						this.element = $('<nav class="chat-ui combobox" />');
						this.limit = Infinity;
						this.placeholder = 'Type here';
						if (typeof config != 'undefined') {
							this.items = config.items || [];
							this.grouped = !(config.items instanceof Array);
							this.limit = config.limit || Infinity;
							this.placeholder = config.placeholder || 'Type here';
						}

						if (
							(this.limit !== Infinity || this.limit > 0 || !isNaN(this.limit)) &&
							!this.grouped
						) {
							var t = this;
							this.items = this.items.filter(function(item, index) {
								return index < t.limit;
							});
						}

						this.create = function() {
							var that = this,
								$combobox = this.element;
							$combobox.attr('id', this.id);
							$combobox.html(function() {
								var $comboinput = $('<input type="text" class="combobox-input" />'),
									$drop = $('<span class="combobox-drop combobox-arrow" />'),
									$combolist = $('<div class="combobox-list-wrapper" />'),
									$combowrapper = $('<div class="combobox-input-wrapper" />');
								$comboinput.attr('placeholder', that.placeholder);
								$drop.on('click', function(_e) {
									if ($(_e.target).parents().next('.combobox-list-wrapper').length > 0) {
										if ($(_e.target).parents().next('.combobox-list-wrapper').is(':hidden')) {
											$(_e.target).parents().next('.combobox-list-wrapper').slideDown(500);
										} else {
											$(_e.target).parents().next('.combobox-list-wrapper').slideUp(500);
										}
									}
								});
								$combowrapper.html([$comboinput, $drop]);
								$combolist.hide();
								$combolist.html(function() {
									var $html = null;
									if (that.grouped) {
										$html = Object.keys(that.items).map(function(name, index) {
											var _class = 'combobox-group-' + index,
												_items = that.items[name],
												$group = $('<section class="combobox-group ' + _class + '" />');
											$group.html([
												$('<h3 class="combobox-group-heading" />')
												.html(name),
												$('<ul class="combobox-list combobox-group-list" />')
												.html(
													Array.prototype.map.call(_items, function(item, i) {
														var $item = $('<li class="combobox-item combobox-list-item" />');
														$item.html(
															$('<a href="#" data-target="#' + that.id + ' .combobox-input" class="combobox-item" />')
															.html(item)
															.on('click', function(event) {
																event.preventDefault();
																var input = $(event.target).attr('data-target'),
																	$target = $(input);
																$(event.target).parents('.combobox-list-wrapper').slideUp(500);
																$target.val($(event.target).text());
															})
														);
														return $item;
													})
												)
											]);
											return $group;
										});
									} else {
										$html = $('<ul class="combobox-list no-group" />');
										$html.html(
											Array.prototype.map.call(that.items, function(item, index) {
												var $item = $('<li class="combobox-item combobox-list-item" />');
												$item.html(
													$('<a href="#" data-target="#' + that.id + ' .combobox-input" class="combobox-item-link" />')
													.text(item)
													.on('click', function(event) {
														event.preventDefault();
														var input = $(event.target).attr('data-target'),
															$target = $(input);
														$target.val($(event.target).text());
														$(event.target).parents('.combobox-list-wrapper').slideUp(500);
													})
												);
												return $item;
											})
										);
									}
									return $html;
								});
								return [$combowrapper, $combolist];
							});
							return $combobox;
						};

						this.getValue = function() {
							var $elem = $('#' + this.id),
								$target = $elem.find('.combobox-input'),
								value = $target.val();
							if (typeof value !== 'string') {
								return '';
							} else {
								return value;
							}
						};
						return this;
					case 'list':
						this.items = [];
						this.row_limit = 2;
						this.limit = this.row_limit;
						this.multiple = true;
						this.element = $('<nav class="chat-ui dynamic-list-wrapper dynamic-list" />');
						if (typeof config !== 'undefined') {
							this.items = config.items || [];
							this.row_limit = config.row_limit || 2;
							this.limit = this.row_limit;
							this.multiple = config.multiple || true;
						}

						this.create = function() {
							var list = '<ul class="dynamic-list-section">',
								$list = this.element,
								that = this;
							$list.attr('id', this.id);
							Array.prototype.forEach.call(this.items, function(item, index) {
								if (index % that.limit === 0) {
									list += '</ul><ul class="dynamic-list-section list-section">';
									list += '<li class="dynamic-list-item list-item item">';
									list += '<label class="dynamic-list-label dynamic-list-content" for="' + that.id + '-item-' + index + '">' + item + '</label>';
									list += '<input type="' + (that.multiple ? 'checkbox' : 'radio') + '" name="' + that.id + '" id="' + that.id + '-item-' + index + '" />';
									list += '</li>';
								} else {
									list += '<li class="dynamic-list-item list-item item">';
									list += '<label class="dynamic-list-label dynamic-list-content" for="' + that.id + '-item-' + index + '">' + item + '</label>';
									list += '<input type="' + (that.multiple ? 'checkbox' : 'radio') + '" name="' + that.id + '" id="' + that.id + '-item-' + index + '" />';
									list += '</li>';
								}
							});
							list += '</ul>';
							$list.html(list);
							return $list;
						};

						this.getValue = function(target) {
							var value = null;
							if (this.multiple) {
								value = [];
								if (typeof target !== undefined) {
									target.each(function(index) {
										var $t = $(this);
										if ($t.parents('.dynamic-list-item').hasClass('selected')) {
											value[value.length] = $t.text();
										}
									});
								}
							} else {}
							return value;
						};
						return this;
					case 'input':
						this.placeholder = '';
						this.element = $('<div class="chat-ui input" />');
						if (typeof config !== 'undefined') {
							this.placeholder = config.placeholder;
						}
						this.create = function() {
							var that = this,
								$input = this.element,
								$input_elem = $('<input type="text" class="input-box" />');
							$input.attr('id', this.id);
							$input_elem.attr('placeholder', this.placeholder);
							$input.html($input_elem);
							return $input;
						};
						this.getValue = function() {
							var $_input = $('#' + this.id).children('input'),
								value = $_input.val();
							return value;
						};
						return this;
					case 'button':
						this._default = false;
						this.message = '';
						this.action = null;
						if (typeof config !== 'undefined') {
							this._default = config.default || false;
							this.message = config.text || '';
							this.action = config.action || null;
						}
						this.create = function() {
							var that = this,
								$button = $('<a class="chat-ui ui-button" />');
							$button.attr('id', this.id);
							$button.html(this.message);
							if (typeof this.action == 'string') {
								$button.attr('href', this.action);
							} else if (typeof this.action == 'function') {
								$button.attr('href', '#');
								$button.on('click', function(event) {
									event.preventDefault();
									Function.prototype.apply.call(that.action, window, [event]);
								});
							} else {
								throw new ReferenceError('The button action must be a link or a function.');
							}
							return $button;
						};
						return this;
					case 'tooltip':
						this.content = null;
						this.title = '';
						this.notitle = true;
						this.inline = true;
						this.target = config.target;
						if (typeof config !== 'undefined') {
							this.content = config.content || null;
							this.title = config.title || '';
							this.notitle = typeof this.title == 'string' ? false : true;
							this.inline = !config.block || true;
						}
						this.create = function() {
							var that = this,
								$tooltip =
								this.inline ?
								$('<span class="chat-ui tooltip" />') :
								$('<div class="chat-ui tooltip block" />'),
								$target = this.target.wrap('<div class="chat-ui tooltip-container"></div>');
							if (this.inline) {
								$tooltip.text(this.content);
							} else {
								$tooltip.html(this.content);
							}
							$tooltip.hide();
							if (!$tooltip.exists()) {
								$target.append($tooltip);
								$target.hover(function(event) {
									var $_tooltip = $(event.target).children('.tooltip');
									$_tooltip.fadeIn();
								}, function(event) {
									var $_tooltip = $(event.target).children('.tooltip');
									$_tooltip.fadeOut();
								});
							}
						}
						return this;
					case 'switch':
						return this;
					default:
						return;
				}
			} catch (e) {
				throw new Error(e);
			}
		}
	});
	
	$(document).ready(function(){
		var $toolbar = $('<nav class="ChatToolbar chat-toolbar" id="ChatToolbar" />'),
			$toolbar_wrapper = $('<div class="toolbar-wrapper chat-toolbar-wrapper" />'),
			$links = [],
			$collapse = $('<a href="#ChatToolbar" class="chat-toolbar-collapse toolbar-collapse" />');
		$collapse.html('<i class="icon ion-chevron-' + (toolbar.collapsed ? 'up' : 'down') + '" />');
		$collapse.on('click', function(event){
			event.preventDefault();
			var link = $(event.target),
				$target = $(link.prop('hash'));
			if (toolbar.collapsed){
				$target.removeClass('collapsed');
				link.find('.icon').removeClass('ion-chevron-up').addClass('ion-chevron-down');
				toolbar.expand();
				toolbar.collapsed = false;
			} else {
				$target.addClass('collapsed');
				link.find('.icon').removeClass('ion-chevron-down').addClass('ion-chevron-up');
				toolbar.collapse();
				toolbar.collapsed = true;
			}
		});
		
		$links = Object.keys(toolbar.items).map(function(item){
			var item_data = toolbar.items[item],
				$html = $('<div class="toolbar-item" />');
			$html.attr('id', item_data.id);
			$html.attr('data-name', item);
			$html.html(
				$('<a href="#ChatToolbar" class="toolbar-link" />')
					.html(item)
					.on('click', function(event){
						event.preventDefault();
						Function.prototype.apply.call(item_data.handler, window, [event]);
					})
			);
			return $html;
		});
		
		$toolbar_wrapper.html($links);
		$toolbar.html([$toolbar_wrapper, $collapse]);
		if (!$('#ChatToolbar').exists()){
			$('.ChatWindow').append($toolbar);
		}
	});
})(this.mediaWiki, this.jQuery, this.mainRoom, this.ChatToolbar = this.ChatToolbar || {});
