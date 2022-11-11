import Component from '../core/Component.js';

export default class FeedbackStats extends Component {
	template() {
		const { feedbackList } = this.$props;

		const avrg = Math.round(
			feedbackList.reduce((acc, { rating }) => acc + rating, 0) /
				feedbackList.length
		);

		return `
		<div>
		${feedbackList.length}
		${feedbackList.length === 1 ? 'Review' : 'Reviews'}
		</div>
		<div>Average Rating:
		${!isNaN(avrg) && feedbackList.length > 0 && avrg}
		</div>
		`;
	}
}
