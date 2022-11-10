import Component from '../core/Component.js';

export default class Header extends Component {
	template() {
		const { getState } = this.$props;
		const { user } = getState();
		return `
		<nav>
		<ul id="navigation">
			<li>
				<a href="/about">About</a>
			</li>
			<li><a href="/">Feedback</a></li>
			${
				user
					? '<li><button class="btn-logout">Logout</button></li>'
					: '<li><a href="/sign-in">Login</a></li>'
			}
			
		</ul>
	</nav>`;
	}

	setEvent() {
		this.addEvent('click', '.btn-logout', (e) => {
			const { handleLogout } = this.$props;
			handleLogout();
			this.render();
		});
	}
}
