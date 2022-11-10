import Component from '../core/Component.js';

export default class Signup extends Component {
	setup() {
		this.$state = {
			email: '',
			password: '',
			password2: '',
			name: '',
		};
	}

	template() {
		return `
		<div id='feedback-auth'>
			<h2>회원 가입</h2>
			<form>
				<label for='email'>
					이메일
				</label>
				<input 
					id='email'
					type="email"
					name="email"
					placeholder="Email"
				/>
				
				<label for='name'>
					이름
				</label>
				<input 
					id='name'
					type="name"
					name="name"
					placeholder="Name"
				/>

				<label for='password'>
					비밀번호
				</label>
				<input 
				id='password'
				type="password"
				name="password"
				autocomplete=''
				placeholder="Password"
				/>

				<label for='password2'>
					비밀번호 확인
				</label>
				<input 
				id='password2'
				type="password"
				name="password2"
				autocomplete=''
				placeholder="Confirm Password"
				/>

				
			<button id='auth-button' type='submit' disabled class='disabledBtn'>
				가입하기
			</button>
			</form>
			<div id='link-signup'>
				<a href="/sign-in">로그인</a>
			</div>
		</div>
		`;
	}

	setEvent() {
		this.addEvent('keyup', 'input', ({ target: { id, value } }) => {
			const $authSubmitBtn = this.$target.querySelector('#auth-button');

			this.setState({ [id]: value }, 'stopRender');

			const { email, name, password, password2 } = this.$state;

			if ((email, name, password, password2)) {
				$authSubmitBtn.removeAttribute('disabled');
				$authSubmitBtn.removeAttribute('class');
			} else {
				$authSubmitBtn.setAttribute('disabled', 'true');
				$authSubmitBtn.setAttribute('class', 'disabledBtn');
			}
		});

		this.addEvent('click', 'button', async (e) => {
			e.preventDefault();
			const { email, name, password, password2 } = this.$state;
			if (password !== password2) {
				alert('비밀번호를 확인해주세요.');
			} else {
				if (email && name && password) {
					const { handleRegister } = this.$props;
					await handleRegister({ email, password, name });
					this.setState({ email: '', password: '', name: '' });
				}
			}
		});
	}
}
