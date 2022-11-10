import Component from './core/Component.js';

import NotFound from './components/shared/NotFound.js';
// import Header from './components/Header.js';
import About from './pages/About.js';
import Feedback from './pages/Feedback.js';
import SignIn from './pages/SignIn.js';
import SignUp from './pages/SignUp.js';

// import { loginUser, registerUser } from './contexts/auth/AuthAction.js';

const routes = [
	{ path: '/', component: Feedback },
	{ path: '/about', component: About },
	{ path: '/sign-in', component: SignIn },
	{ path: '/sign-up', component: SignUp },
];

export default class App extends Component {
	setup() {
		const user = JSON.parse(localStorage.getItem('user'));
		this.$state = {
			user: user ? user : null,
			isError: false,
			isSuccess: false,
			isLoading: false,
			message: '',
		};
	}

	template() {
		return `
			<header></header>
	    <main></main>
    `;
	}

	mounted() {
		const $header = this.$target.querySelector('header');
		const { getState, handleLogout } = this;
		// new Header($header, {
		// 	getState: getState.bind(this),
		// 	handleLogout: handleLogout.bind(this),
		// });

		window.addEventListener('DOMContentLoaded', () => {
			this.render();
		});

		window.addEventListener('popstate', () => {
			this.render();
		});
	}

	render = (path) => {
		const _path = path ?? window.location.pathname;

		try {
			const component =
				routes.find((route) => route.path === _path)?.component || null;

			const $main = this.$target.querySelector('main');

			// wrong routes
			if (component === null) {
				return new NotFound($main);
			}

			const $navItem = this.$target.querySelectorAll('a');

			$navItem.forEach((element) => {
				const path = element.getAttribute('href');
				if (path === _path) {
					element.setAttribute('class', 'selectedNavItem');
				} else {
					if (element.className === 'selectedNavItem') {
						element.removeAttribute('class');
					}
				}
			});

			const { user, isSuccess } = this.$state;
			if (
				(_path === '/sign-in' || _path === '/sign-up') &&
				(user || isSuccess)
			) {
				window.location.href = '/';
			} else {
				const { handleLogin, handleRegister, getState } = this;

				new component($main, {
					handleLogin: handleLogin.bind(this),
					handleRegister: handleRegister.bind(this),
					getState: getState.bind(this),
				});
			}
		} catch (err) {
			console.error(err);
		}
	};

	setEvent() {
		this.addEvent('click', '#navigation', (e) => {
			if (!e.target.matches('#navigation > li > a')) return;
			e.preventDefault();

			const path = e.target.getAttribute('href');

			window.history.pushState(null, null, path);
			this.render(path);
		});
	}

	getState() {
		return this.$state;
	}

	async handleLogin(formData) {
		const payload = await loginUser(formData);
		const { success, data } = payload;
		if (success) {
			this.setState({ user: data, isSuccess: true });
		} else {
			alert(data);
		}
	}

	async handleRegister(formData) {
		const payload = await registerUser(formData);
		const { success, data } = payload;

		if (success) {
			this.setState({ user: data, isSuccess: true });
		} else {
			alert(data);
		}
	}

	async handleLogout() {
		localStorage.removeItem('user');
		this.setState({ user: null }, 'stopRender');
		window.location.href = '/';
	}
}
