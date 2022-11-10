import Component from '../core/Component.js';

export default class About extends Component {
	template() {
		return `
			<div id='about' class='card-header'>
				<div>
					<h1 >About This Project</h1>
					<p>This is a React app to leave feedback for a product or service</p>
					<p>
						This is the project based from one of bradtraversy's udemy courses,
						"React Front To Back 2022".
					</p>
					<p>Version: 0.1.0</p>
			</div>
		`;
	}
}
