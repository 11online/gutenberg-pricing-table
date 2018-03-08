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

	 // <PlainText
		//  style={{ backgroundColor: "rgba(0,0,0,0)", textAlign: "center", width: "50%"}}
		//  value={pricingItem.title}
		// 	onChange={ value => {
		// 		let newPricingItems = [ ...attributes.pricingItems ]
		// 		newPricingItems[i].title = value
		// 		setAttributes( { pricingItems: newPricingItems } )
		// 	} }
	 // />

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
												<PlainText
													style={{ backgroundColor: "rgba(0,0,0,0)", textAlign: "center"}}
													value={planItem.text}
													onChange={(value) => {
														let newPlanItem = { text: value }
														let newPlanItems = [ ...attributes.pricingItems[i].planItems ]
														newPlanItems[j] = newPlanItem
														let newPricingItems = [ ...attributes.pricingItems ]
														newPricingItems[i].planItems = newPlanItems
														setAttributes( { pricingItems: newPricingItems } )
													}}
												/>
											</div>
										)
									})
								}
							</div>
							<div style={{textAlign: 'right'}}>
								{ __("Add or Remove Detail:") }&nbsp;
								<button style={{display: 'inline-block'}} className="components-button components-icon-button"
									onClick={() => {
										let newPlanItem = { text: "Detail Text" }
										let newPlanItems = [ ...attributes.pricingItems[i].planItems ]
										newPlanItems.push(newPlanItem)
										let newPricingItems = [ ...attributes.pricingItems ]
										newPricingItems[i].planItems = newPlanItems
										setAttributes( { pricingItems: newPricingItems } )
									}}><span className="dashicons dashicons-plus"></span></ button>
								<button style={{display: 'inline-block'}} className="components-button components-icon-button"
									onClick={() => {
										let newPlanItems = [ ...attributes.pricingItems[i].planItems ]
										newPlanItems.pop()
										let newPricingItems = [ ...attributes.pricingItems ]
										newPricingItems[i].planItems = newPlanItems
										setAttributes( { pricingItems: newPricingItems } )
									}}><span className="dashicons dashicons-minus"></span></ button>
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
											<Dropdown
												className="pricingItem-controls-button"
												contentClassName="pricingItem-controls"
												renderToggle={ ( { isOpen, onToggle } ) => (
													<button className="button is-fullwidth" style={{width: "100px", color: "white", backgroundColor: pricingItem.color}}  onClick={ onToggle }>
														{ pricingItem.button.text }
													</button>
												) }
												renderContent={ () => (
													<div>
														<TextControl
															label={ __( "Button Text:" ) }
															value={pricingItem.button.text}
															 onChange={ value => {
																 let newPricingItems = [ ...attributes.pricingItems ]
																 newPricingItems[i].button.text = value
																 setAttributes( { pricingItems: newPricingItems } )
															 } }
															placeholder={ __("Button Text") }
														/>
														<TextControl
															label={ __( "Destination Path:" ) }
															value={pricingItem.button.link}
															 onChange={ value => {
																 let newPricingItems = [ ...attributes.pricingItems ]
																 newPricingItems[i].button.link = value
																 setAttributes( { pricingItems: newPricingItems } )
															 } }
															placeholder={ __("Destination Path") }
														/>
													</div>
												)}
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

		const addRemovePlanItem = (
			<div style={{textAlign: 'right'}}>
				<button style={{display: 'inline-block'}} className="components-button components-icon-button" onClick={(event) => {
					console.log(event)
					let key = 'test'
					let obj = {}
				}}><span className="dashicons dashicons-plus"></span></ button>
				<button style={{display: 'inline-block'}} className="components-button components-icon-button"><span className="dashicons dashicons-minus"></span></ button>
			</div>
		)

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
