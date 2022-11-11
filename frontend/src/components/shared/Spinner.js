import Component from '../../core/Component.js';

export default class Spinner extends Component {
	template() {
		return `
			<div id='loadingSpinnerContainer'>
				<div id='loadingSpinner'></div>
			</div>
			`;
	}
}
