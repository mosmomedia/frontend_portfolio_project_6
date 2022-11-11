import Component from '../core/Component.js';

import FeedbackForm from '../components/FeedbackForm.js';
import FeedbackList from '../components/FeedbackList.js';
import FeedbackEditForm from '../components/FeedbackEditForm.js';

import Spinner from '../components/shared/Spinner.js';

import {
	getAllFeedbacks,
	postFeedback,
	updateFeedback,
	deleteFeedback,
} from '../contexts/feedback/FeedbackAction.js';

export default class Feedback extends Component {
	setup() {
		this.$state = {
			isLoading: false,
			feedbackList: [],
			currentFeedback: null,
			editMode: false,
		};
	}

	template() {
		const { isLoading } = this.$state;

		if (isLoading)
			return `
			<div id='spinner'></div>
			`;

		return `
		<div id='feedback'>
			<form id='feedback-form' class='card-header'></form>
			<div id='feedback-list'></div>
		</div>`;
	}

	mounted() {
		const { isLoading, editMode } = this.$state;
		const { getState } = this.$props;
		const {
			getCurrentFeedback,
			setCurrentFeedback,
			switchEditMode,
			getLoadingState,
			getFeedbackList,
			fetchAllFeedback,
			createFeedback,
			editFeedback,
			removeFeedback,
		} = this;

		if (isLoading) {
			const $spinner = this.$target.querySelector('#spinner');
			new Spinner($spinner);
		} else if (editMode) {
			const $feedback = this.$target.querySelector('#feedback');
			new FeedbackEditForm($feedback, {
				getCurrentFeedback: getCurrentFeedback.bind(this),
				editFeedback: editFeedback.bind(this),
				getState: getState,
			});
		} else {
			const $feedbackForm = this.$target.querySelector('#feedback-form');
			const $feedbackList = this.$target.querySelector('#feedback-list');

			new FeedbackForm($feedbackForm, {
				createFeedback: createFeedback.bind(this),
				getState: getState,
			});

			new FeedbackList($feedbackList, {
				setCurrentFeedback: setCurrentFeedback.bind(this),
				getFeedbackList: getFeedbackList.bind(this),
				getLoadingState: getLoadingState.bind(this),
				switchEditMode: switchEditMode.bind(this),
				fetchAllFeedback: fetchAllFeedback.bind(this),
				removeFeedback: removeFeedback.bind(this),
				getState: getState,
			});
		}
	}

	handleLoadingState(boolean) {
		this.setState({ isLoading: boolean });
	}

	getLoadingState() {
		return this.$state.isLoading;
	}

	getFeedbackList() {
		return this.$state.feedbackList;
	}

	getCurrentFeedback() {
		return this.$state.currentFeedback;
	}

	setCurrentFeedback(currentFeedback) {
		this.setState({ currentFeedback }, 'stopRender');
	}

	switchEditMode() {
		const { editMode } = this.$state;
		this.setState({ editMode: !editMode });
	}

	async fetchAllFeedback(target) {
		this.setState({ isLoading: true }, 'stopRender');
		const payload = await getAllFeedbacks();

		setTimeout(() => {
			this.setState(
				{ feedbackList: payload.reverse(), isLoading: false },
				'targetRender',
				target
			);
		}, 100);
	}

	async createFeedback(formData) {
		this.handleLoadingState(true);

		const { feedbackList } = this.$state;
		const newFeedback = await postFeedback(formData);

		const payload = [newFeedback, ...feedbackList];

		setTimeout(() => {
			this.setState({
				feedbackList: payload,
				isLoading: false,
			});
		}, 200);
	}

	async editFeedback(formData, id) {
		this.handleLoadingState(true);
		const updatedFeedback = await updateFeedback(formData, id);
		const { feedbackList } = this.$state;
		const payload = feedbackList.map((feedback) => {
			if (feedback._id === id) {
				return updatedFeedback;
			} else {
				return feedback;
			}
		});
		setTimeout(() => {
			this.setState({
				feedbackList: payload,
				isLoading: false,
				editMode: false,
			});
		}, 200);
	}

	async removeFeedback(id) {
		if (window.confirm('삭제하시겠습니까?')) {
			this.handleLoadingState(true);
			const { success } = await deleteFeedback(id);
			if (success) {
				const { feedbackList } = this.$state;
				const payload = feedbackList.filter((item) => item._id !== id);

				setTimeout(() => {
					this.setState({
						feedbackList: payload,
						isLoading: false,
					});
				}, 200);
			}
		}
	}
}
