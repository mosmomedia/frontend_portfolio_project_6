export default class Component {
	$target;
	$state;
	$props;
	constructor($target, $props) {
		this.$target = $target;
		this.$props = $props;
		this.setup();
		this.setEvent();
		this.render();
	}
	setup() {}
	mounted() {}
	template() {
		return '';
	}
	render(type, target) {
		if (type === 'targetRender') {
			target.render();
		} else {
			this.$target.innerHTML = this.template();
			this.mounted();
		}
	}

	setEvent() {}

	addEvent(eventType, selector, callback) {
		this.$target.addEventListener(eventType, (event) => {
			if (!event.target.closest(selector)) return false;
			callback(event);
		});
	}

	setState(newState, type, target) {
		this.$state = { ...this.$state, ...newState };
		if (type !== 'stopRender') {
			this.render(type, target);
		}
	}
}
