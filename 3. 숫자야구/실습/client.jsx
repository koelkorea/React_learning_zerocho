// client.jsx의 존재 이유 
//  :  이 녀석은 타 jsx에서 만들어진 컴포넌트들을 가져오고, ReactDom을 통해 직접 render하는 역할 수행 용도
//      -> 그래서, ReactDom 코드를 불러오고, 타 컴포넌트가 정의된 jsx파일도 불러옴
//         (= 이를 통해 필요한 컴포넌트를 선별해, 레고조립하듯 끼워서 랜더링 할 수 있음)

// java의 import 클래스명 과 같은 역할 수행하는 구문
//  - require('클래스명 or 파일명')          : 
//  - import '변수명' from '클래스 및 파일명' : node.js의 모듈 시스템 (구) 과거에 썼던 자바랑 유사한 구문

// React와 ReactDOM의 코드를 불러와서 씀
const React = require('react');     // import React from 'react'; 와 비슷한 의미 (과거 소스를 볼떄를 대비해서 알아두자)
const ReactDom = require('react-dom');

// hot : 2022에는 없어진 녀석 (과거의 소스를 볼 때 대비해서 알아두자)
// const { hot } = require('react-hot-loader/root');
// const Hot = hot(NumberBaseball);

// 컴포넌트명.jsx의 module.exports = NumberBaseball 코드를 통해, 해당 jsx파일 코드를 불러올 수 있음
// (= 해당 파일 내에 정의한 컴포넌트를 끌어다 쓸 수 있다는 이야기) 
const NumberBaseball = require('./NumberBaseball');

// jsx확장자의 좋은점 : 쓰면 사실상 react용 파일이라는걸 예측가능
ReactDOM.createRoot(document.querySelector('#root')).render( <NumberBaseball /> ); 

// ReactDom.render(<NumberBaseball />, document.querySelector("#root"));     // (구) 17버전 코드
