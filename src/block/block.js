/**
 * BLOCK: gutenberg-pop-up
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType, PlainText } = wp.blocks; // Import registerBlockType() from wp.blocks
const TextControl = wp.components.TextControl;
const SelectControl = wp.components.SelectControl;
const RangeControl = wp.components.RangeControl;
const IconButton = wp.components.IconButton;
const { Component } = wp.element;
const InspectorControls = wp.blocks.InspectorControls;
const ColorPalette = wp.blocks.ColorPalette;
const Dropdown = wp.components.Dropdown;
const ToggleControl = wp.components.ToggleControl;

// class EditorComponent extends Component {
//
//
// 	constructor() {
// 		super( ...arguments );
// 		this.state = {
// 			isEditing: false,
// 			colorSelector: 'titleColor',
// 		}
// 	}
//
// 	componentDidMount() {
// 		const randomKey = "myModal" + Math.floor(Math.random() * 1000);
// 		this.props.setAttributes({randomKey: randomKey});
// 	}
//
// 	handleChildClick(e) {
// 		e.stopPropagation();
// 		this.setState( { colorSelector: e.target.className } );
// }
//
// 	render() {
// 		const { attributes, setAttributes, className, focus} = this.props;
//
// 		const styles = {
// 			previewBox: {
// 				titleBackgroundColor: {
// 					backgroundColor: attributes.titleBackgroundColor,
// 					borderBottom: '1px solid #e5e5e5',
// 					height: "40%",
// 					borderRadius: `${attributes.borderRadius}px ${attributes.borderRadius}px 0 0`,
// 				},
// 				titleColor: {
// 					color: attributes.titleColor,
// 					width: "50%",
// 					padding: "2px",
// 				},
// 				textColor: {
// 					color: attributes.textColor,
// 				},
// 			},
// 			modal: {
// 				modalContent: {
// 					backgroundColor: attributes.textBackgroundColor,
// 					color: attributes.textColor,
// 					borderRadius: attributes.borderRadius,
// 				},
// 				modalHeader: {
// 					backgroundColor: attributes.titleBackgroundColor,
// 					borderRadius: `${attributes.borderRadius}px ${attributes.borderRadius}px 0 0`,
// 				},
// 				modalTitle: {
// 					color: attributes.titleColor,
// 				},
// 			},
// 		}
//
// 		const controls = focus ?
// 		 (
// 			 <InspectorControls>
// 				<SelectControl
// 					label={ __("Size: ") }
// 					value={ attributes.size }
// 					options={[
// 						{ value: ' modal-lg', label: 'Large' },
// 						{ value: '', label: 'Medium' },
// 						{ value: ' modal-sm', label: 'Small' },
// 					]}
// 					onChange={ (value) => setAttributes( { size: value } ) }
// 				/>
// 				<SelectControl
// 					label={ __("Animation: ") }
// 					value={ attributes.animation }
// 					options={[
// 						{ value: 'fadeIn', label: __("Fade In") },
// 						{ value: 'bounce', label: __("Bounce") },
// 						{ value: 'shake', label: __("Shake") },
// 						{ value: 'flipBounceYIn', label: __("Flip") },
// 						{ value: 'shrinkIn', label: __("Zoom Out") },
// 						{ value: 'expandIn', label: __("Zoom In") },
// 						{ value: 'slideDownIn', label: __("Slide In") },
// 						{ value: 'perspectiveLeftIn', label: __("Perspective In") },
// 						{ value: 'pulse', label: __("Pulse") },
// 						{ value: 'swing', label: __("Swing") },
// 						{ value: 'tada', label: __("Tada") }
// 					]}
// 					onChange={ (value) => setAttributes( { animation: value } ) }
// 				/>
// 				<SelectControl
// 					label={ __("Color: ") }
// 					value={ this.state.colorSelector }
// 					options={[
// 						{ value: 'titleColor', label: __("Title") },
// 						{ value: 'titleBackgroundColor', label: __("Title Background") },
// 						{ value: 'textColor', label: __("Content") },
// 						{ value: 'textBackgroundColor', label: __("Content Background") },
// 					]}
// 					onChange={ (value) => this.setState( { colorSelector: value } ) }
// 				/>
// 				<ColorPalette
// 					onChange={ ( value ) => {
// 						switch (this.state.colorSelector) {
// 						  case 'textBackgroundColor':
// 						    setAttributes( { textBackgroundColor: value} );
// 						    break;
// 							case 'titleBackgroundColor':
// 							  setAttributes( { titleBackgroundColor: value} );
// 							  break;
// 						  case 'titleColor':
// 								setAttributes( { titleColor: value} );
// 								break;
// 						  case 'textColor':
// 						    setAttributes( { textColor: value} );
// 						    break;
// 							}
// 						}
// 					}
// 				/>
// 				<RangeControl
// 				label={ __("Border: ") }
// 				value={ (attributes.borderRadius / 3) }
// 				min={ 0 }
// 				max={ 5 }
// 				onChange={ (value) => setAttributes( { borderRadius: (value * 3) } ) }
// 				/>
// 				<div className="colorPreview" onClick={ () => this.setState( { colorSelector: 'textBackgroundColor' } ) } style={{
// 						borderRadius: attributes.borderRadius,
// 						border: "1px solid rgba(0, 0, 0, 0.2)",
// 						width: "75px",
// 						height: "60px",
// 						position: "relative",
// 						left: "33%",
// 						textAlign: 'center',
// 						backgroundColor: attributes.textBackgroundColor,
// 						boxShadow: "0 2px 5px rgba(0, 0, 0, 0.5)",
// 						marginBottom: "3px",
// 					}}>
// 					<div className="titleBackgroundColor" style={ styles.previewBox.titleBackgroundColor } onClick={ (e) => this.handleChildClick(e) }>
// 						<h3 className="titleColor" style={ styles.previewBox.titleColor } onClick={ (e) => this.handleChildClick(e) }>Title</h3>
// 					</div>
// 					<p className="textColor" style={ styles.previewBox.textColor } onClick={ (e) => this.handleChildClick(e) }>Content</p>
// 				</div>
// 			</InspectorControls>
// 		) : null;
//
// 		return [
// 			controls,
// 			(
// 				<div>
// 				{ this.state.isEditing
// 					?
// 						<div>
// 							<TextControl
// 								label="Button Text:"
// 								onChange={ ( value ) => setAttributes( { buttonText: value } ) }
// 								value={ attributes.buttonText }
// 								placeholder="Button Text"
// 							/>
// 							<TextControl
// 								label="Pop Up Title:"
// 								onChange={ ( value ) => setAttributes( { title: value } ) }
// 								value={ attributes.title }
// 								placeholder="Pop Up Title"
// 							/>
// 							<label class="blocks-base-control__label">Pop Up Content:</label>
// 							<InnerBlocks/>
// 							<div style={{textAlign: 'right'}}>
// 								<IconButton style={{display: 'inline-block'}} icon="editor-break" label={ __( 'Apply' ) } type="submit" onClick={(event) => { event.preventDefault(); this.setState({ isEditing: false });}}/>
// 							</div>
// 						</div>
// 					:
// 						<div className={ className } onClick={() => this.setState({ isEditing: true })}>
// 							<p><button type="button" className="btn btn-primary btn-lg" data-toggle="modal" data-target={"#"+attributes.randomKey}>
// 								{attributes.buttonText}
// 							</button></p>
//
// 							<div className="modal fade" data-easein={attributes.animation} id={attributes.randomKey} tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
// 								<div className={ "modal-dialog"+attributes.size } role="document">
// 									<div className="modal-content" style={ styles.modal.modalContent }>
// 										<div className="modal-header" style={ styles.modal.modalHeader }>
// 											<h4 className="modal-title" id="myModalLabel" style={ styles.modal.modalTitle }>{attributes.title}</h4>
// 											<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
// 										</div>
// 										<div className="modal-body">
// 											<InnerBlocks/>
// 										</div>
// 									</div>
// 								</div>
// 							</div>
// 						</div>
// 				}
//
// 			</div>)
// 		];
// 	}
// }

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'block-party/block-gutenberg-pricing-table', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Pricing Table' ), // Block title.
	icon: 'editor-table', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Pricing Table' )
	],
	attributes: {
		pricingItems: {
			type: 'array',
			default: [],
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */

	edit: function({ attributes, setAttributes, focus, setFocus, className }) {

		const renderPricingTable = (
			<div className="pricing-table">
				{ attributes.pricingItems.map( (pricingItem, i) => {
					return (
						<div className={"pricing-plan "+i} key={i}>
							<Dropdown
								className="pricingItem-controls-button"
								contentClassName="pricingItem-controls"
								position="bottom right"
								renderToggle={ ( { isOpen, onToggle } ) => (
									<div style={{textAlign: 'right'}}>
										<button style={{display: "inline-block", padding: "none", textIndent: "none"}} className="components-button components-icon-button" onClick={ onToggle } aria-expanded={ isOpen }>
											<span className="dashicons dashicons-admin-generic"></span>
										</button>
									</div>
								) }
								renderContent={ () => (
									<div>
										<TextControl
											label={ __("Title:") }
											value={pricingItem.title}
											 onChange={ value => {
												 let newPricingItems = [ ...attributes.pricingItems ]
												 newPricingItems[i].title = value
												 setAttributes( { pricingItems: newPricingItems } )
											 } }
											placeholder={ __("Title") }
										/>
										<div className="pricingItems-controls-sm">
											<SelectControl
												label={ __("Symbol:") }
												value={ pricingItem.currency }
												options={[
																		{ value: '$', label: '$' },
																		{ value: '£', label: '£' },
																		{ value: '€', label: '€' },
																	]}
												onChange={ value => {
 												 let newPricingItems = [ ...attributes.pricingItems ]
 												 newPricingItems[i].currency = value
 												 setAttributes( { pricingItems: newPricingItems } )
 											 } }
											/>
											<TextControl
												style={{textAlign: 'center'}}
												label={ __("Amount:") }
												value={pricingItem.amount}
												 onChange={ value => {
													 let newPricingItems = [ ...attributes.pricingItems ]
													 newPricingItems[i].amount = value
													 setAttributes( { pricingItems: newPricingItems } )
												 } }
												placeholder={ __("Amount") }
											/>
											<TextControl
												style={{textAlign: 'center'}}
												label={ __("Amount Subtext:") }
												value={pricingItem.per}
												 onChange={ value => {
													 let newPricingItems = [ ...attributes.pricingItems ]
													 newPricingItems[i].per = value
													 setAttributes( { pricingItems: newPricingItems } )
												 } }
												placeholder={ __("Amount Subtext") }
											/>
											<ColorPalette
												value={pricingItem.color}
												onChange={ (value) => {
													let newPricingItems = [ ...attributes.pricingItems ]
													newPricingItems[i].color = value
													setAttributes( { pricingItems: newPricingItems } )
												} }
											/>
										</div>
									</div>
								) }
							/>
							<div className="plan-header">
								{pricingItem.title}
							</div>
							<div className="plan-price">
								<span className="plan-price-amount" style={{color: pricingItem.color}}>
									<span className="plan-price-currency">
										{pricingItem.currency}
									</span>
									{pricingItem.amount}
								</span>
								{pricingItem.per}
							</div>
							<div className="plan-items">
								{
									pricingItem.planItems.map( (planItem, j) => {
										return (
											<div className={"plan-item "+j} key={j}>
												{planItem.text}
											</div>
										)
									})
								}
							</div>
							<div style={{textAlign: 'right'}}>
								<button style={{display: 'inline-block'}} className="components-button components-icon-button" onClick={() => {
									console.log('test')
								}}><span className="dashicons dashicons-plus"></span></ button>
								<button style={{display: 'inline-block'}} className="components-button components-icon-button"><span className="dashicons dashicons-minus"></span></ button>
							</div>
							<div className="plan-footer">
								<ToggleControl
									label={ __("Button?") }
									checked={ !! pricingItem.button.hasButton }
									onChange={ value => {
										let newPricingItems = [ ...attributes.pricingItems ]
										newPricingItems[i].button.hasButton = ! pricingItem.button.hasButton
										setAttributes( { pricingItems: newPricingItems } )
									} }
								/>
								{
									pricingItem.button.hasButton ? (
										<div>
											<button className="button is-fullwidth" style={{width: "100px", backgroundColor: pricingItem.color}}>
												<PlainText
													style={{width: "75px", color: "white", backgroundColor: "rgba(0,0,0,0)"}}
													value={pricingItem.button.text}
													onChange={ (value) => {
														let newPricingItems = [ ...attributes.pricingItems ]
														newPricingItems[i].button.text = value
														setAttributes( { pricingItems: newPricingItems } )
													} }
												/>
											</button>
											<TextControl
												style={{textAlign: 'center'}}
												label={ __("Button Link:") }
												value={pricingItem.button.link}
												 onChange={ value => {
													 let newPricingItems = [ ...attributes.pricingItems ]
													 newPricingItems[i].button.link = value
													 setAttributes( { pricingItems: newPricingItems } )
												 } }
												placeholder={ __("Destination URL") }
											/>
										</div>
									) : null
								}
							</div>
						</div>
					)
				})}
			</div>
		)

		// const addRemovePlanItem = (
		// 	<div style={{textAlign: 'right'}}>
		// 		<button style={{display: 'inline-block'}} className="components-button components-icon-button" onClick={(event) => {
		// 			console.log(event)
		// 			let key = 'test'
		// 			let obj = {}
		// 		}}><span className="dashicons dashicons-plus"></span></ button>
		// 		<button style={{display: 'inline-block'}} className="components-button components-icon-button"><span className="dashicons dashicons-minus"></span></ button>
		// 	</div>
		// )

		const addRemovePricingItem = (
			<div style={{textAlign: 'right'}}>
				{ __("Add or Remove Item:") }&nbsp;
				<button type="button" style={{display: 'inline-block'}} className="components-button components-icon-button" onClick={() => {
					const newPricingItems = [ ...attributes.pricingItems ];
					let obj = {
						title: '',
						amount: '0',
						currency: '$',
						per: '',
						planItems: [],
						button: {
							hasButton: true,
							text: 'Choose',
							link: '',
						},
						color: '#444'
					}
					newPricingItems.push(obj)
					console.log('add')
					console.log(newPricingItems)
					setAttributes( { pricingItems: newPricingItems } );
				}}><span className="dashicons dashicons-plus"></span></button>
				<button type="button" style={{display: 'inline-block'}} className="components-button components-icon-button" onClick={() => {
					console.log('delete')
					console.log(attributes.pricingItems)
					let newPricingItems = [ ...attributes.pricingItems ]
					newPricingItems.pop()
					setAttributes( {pricingItems: newPricingItems})
				}}><span className="dashicons dashicons-minus"></span></button>
			</div>
		);

		return (
			<div className='wp-block-pricing-table'>
				{renderPricingTable}
				{ focus ?
					<div>
						{addRemovePricingItem}
					</div>
				: null }
		 </div>
		)

	},



	save: function({ attributes, setAttributes, focus, setFocus, className }) {

		return (
			<div className="pricing-table">
				{ attributes.pricingItems.map( (pricingItem, i) => {
					return (
						<div className={"pricing-plan "+i} key={i}>
							<div className="plan-header">
								{pricingItem.title}
							</div>
							<div className="plan-price">
								<span className="plan-price-amount" style={{color: pricingItem.color}}>
									<span className="plan-price-currency">
										{pricingItem.currency}
									</span>
									{pricingItem.amount}
								</span>
								{pricingItem.per}
							</div>
							<div className="plan-items">
								{
									pricingItem.planItems.map( (planItem, j) => {
										return (
											<div className={"plan-item "+j} key={j}>
												{planItem.text}
											</div>
										)
									})
								}
							</div>
							<div className="plan-footer">
								{
									pricingItem.button.hasButton ? (
										<button className="button is-fullwidth" style={{backgroundColor: pricingItem.color}} onClick={ () => window.open(pricingItem.button.link)}>{pricingItem.button.text}</button>
									) : null
								}
							</div>
						</div>
					)
				})}
			</div>
		);
	},
} );
