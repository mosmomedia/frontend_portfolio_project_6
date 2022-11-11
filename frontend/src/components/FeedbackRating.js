import Component from '../core/Component.js';

export default class FeedbackRating extends Component {
	template() {
		const { getRating } = this.$props;
		const rating = getRating();

		return `
		${Array.from({ length: 10 }, (_, idx) => {
			return `<li>
				<input class='feeback-rating-item' type='radio' name='rating'
				id='num${idx + 1}'
				value='${idx + 1}'
				${rating === idx + 1 && 'checked'}
				/>
				<label for='num${idx + 1}'>
					${idx + 1}
				</label>
		</li>`;
		}).join(' ')}
		`;
	}

	setEvent() {
		this.addEvent('change', 'input[type=radio]', ({ target: { value } }) => {
			const { setState } = this.$props;
			setState({ rating: +value }, 'targetRender', this);
		});
	}
}
