import FeedbackForm from './FeedbackForm.js';

export default class FeedbackEditForm extends FeedbackForm {
	setup() {
		const { getCurrentFeedback } = this.$props;
		const { rating, text, _id } = getCurrentFeedback();

		this.$state = {
			rating,
			text,
			_id,
			isDisabled: false,
		};
	}

	template() {
		const { text } = this.$state;
		return `
		<form id='feedback-form' class='card-header'>
		<h2>남기신 리뷰를 수정 하시겠습니까?</h2>
		<ul id='feedback-rating'></ul>
		<div id='feedback-submit'>
			<input type="text" id="input-text"required placeholder='리뷰를 남겨주세요.' value='${text}' />
			<button id='feedback-btn' type='submit'>수정하기</button>
		</div>
		<div id='feedback-message'></div>
		</form>
		`;
	}

	getRating() {
		const { rating } = this.$state;
		return rating;
	}

	handleSubmitEvent() {
		this.addEvent('click', 'button', async (e) => {
			e.preventDefault();
			const { rating, text, isDisabled, _id } = this.$state;
			if (rating && text && !isDisabled) {
				const { editFeedback } = this.$props;
				const formData = { rating, text };
				await editFeedback(formData, _id);
			}
		});
	}
}
