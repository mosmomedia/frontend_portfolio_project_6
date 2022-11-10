import Component from '../core/Component.js';

export default class SignIn extends Component {
	setup() {
		this.$state = {
			email: '',
			password: '',
		};
	}

	template() {
		return `
		<div id='feedback-auth'>
				<h2>환영합니다!</h2>
				<form>
					<input 
						id='email'
						type="email"
						name="email"
						placeholder="Email"
					/>
					<input 
					id='password'
					type="password"
					name="password"
					autocomplete=''
					placeholder="Password"
				/>
				<button id='auth-button' type='submit' disabled class='disabledBtn'>
					로그인
				</button>
				</form>
				<div id='link-signup'>
					<a href="/sign-up">회원가입</a>
				</div>
		</div>
		`;
	}

	setEvent() {
		this.addEvent('keyup', 'input', ({ target: { id, value } }) => {
			const $authSubmitBtn = this.$target.querySelector('#auth-button');

			this.setState({ [id]: value }, 'stopRender');

			const { email, password } = this.$state;

			if (email && password) {
				$authSubmitBtn.removeAttribute('disabled');
				$authSubmitBtn.removeAttribute('class');
			} else {
				$authSubmitBtn.setAttribute('disabled', 'true');
				$authSubmitBtn.setAttribute('class', 'disabledBtn');
			}
		});

		this.addEvent('click', 'button', async (e) => {
			e.preventDefault();
			const { email, password } = this.$state;
			if (email && password) {
				const { handleLogin } = this.$props;
				await handleLogin({ email, password });
				this.setState({ email: '', password: '' });
			}
		});
	}
}
