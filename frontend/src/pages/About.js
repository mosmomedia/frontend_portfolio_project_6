import Component from '../core/Component.js';

export default class About extends Component {
	template() {
		return `
			<div id='about' class='card-header'>
				<div>
					<h1 >About This Project</h1>
					<div id='about_desc'>
					<p>이 프로젝트는 <a id='about_link' href='https://zuminternet.github.io/zum-front-recurit-review/' target='blank'>줌인터넷의 주니어 프론트엔드 개발자 채용 과제</a>를 바탕으로 만들어졌습니다.</p>
					<p>리엑트 프레임워크와 클론 코딩 중심의 포트폴리오를 완성 후 채용 프로세스 및 이력서 관련 검색 중에 이 블로그의 포스트를 보았습니다. 이 회사가 기대하는 주니어 개발자의 역량을 목표로 이 프로젝트를 포트폴리오에 추가했습니다.</p>
					<p>이 프로젝트를 통해 직접 프레임워크를 만들고 웹팩+바벨을 통해 개발환경을 구축하는 경험으로 모던 웹 페러다임을 이해하고자 했습니다.</p>
					</div>
					<p class='sub_title'>이 프로젝트를 통해 경험한 것들</p>
					<ul>
						<li>&#8227;	Single Page Application을 컴포넌트 기반으로 설계하기</li>
						<li>&#8227;	간단한 프레임워크 만들기를 통해 내부 동작 이해하기</li>
						<li>&#8227;	webpack + babel를 이용하여 개발환경 구축하기</li>
						<li>&#8227;	NodeJS로 간단한 API 구축하기.</li>
					</ul>
					<p class='sub_title'>이 프로젝트에 사용한 기술들</p>
					<ul>
					<li>&#8227; HTML5, CSS3, JS(ES6), Express.JS, Node.JS MongoDB, Heroku</li>
					</ul>

			
			</div>
		`;
	}
}
