import Component from '../core/Component.js';

import FeedbackStats from '../components/FeedbackStats.js';
import FeedbackItem from '../components/FeedbackItem.js';

import Spinner from './shared/Spinner.js';

export default class FeedbackList extends Component {
	setup() {
		const { fetchAllFeedback } = this.$props;
		// get feedbacks list from db
		fetchAllFeedback(this);
	}

	template() {
		const { getFeedbackList, getLoadingState } = this.$props;
		const isLoading = getLoadingState();
		const feedbackList = getFeedbackList();

		if (isLoading)
			return `
				<div id='spinner'></div>
		`;

		if (feedbackList.length === 0)
			return `<div id='feedback-empty'>No Feedbacks Yet</div>`;

		return `
		<div id='feedback-stats'></div>
		<ul>
		${feedbackList
			.map((_, idx) => {
				return `
				<li class='feedback-item-card' data-id=${idx}></li>`;
			})
			.join('')}
		</ul>
		`;
	}

	mounted() {
		const {
			setCurrentFeedback,
			switchEditMode,
			getLoadingState,
			getFeedbackList,
			removeFeedback,
		} = this.$props;
		const isLoading = getLoadingState();

		if (isLoading) {
			const $spinner = this.$target.querySelector('#spinner');
			return new Spinner($spinner);
		}

		const $feedbackStats = this.$target.querySelector('#feedback-stats');
		if ($feedbackStats) {
			new FeedbackStats($feedbackStats, { feedbackList: getFeedbackList() });
		}

		const $feedbackItems = this.$target.querySelectorAll('.feedback-item-card');
		if ($feedbackItems.length > 0) {
			const feedbackList = getFeedbackList();
			$feedbackItems.forEach((e) => {
				new FeedbackItem(e, {
					...feedbackList[e.dataset.id],
					setCurrentFeedback,
					switchEditMode,
					removeFeedback,
				});
			});
		}
	}
}
