// client.jsx의 존재 이유 
//  :  이 녀석은 타 jsx에서 만들어진 컴포넌트들을 가져오고, ReactDom을 통해 직접 render하는 역할 수행 용도
//      -> 그래서, ReactDom 코드를 불러오고, 타 컴포넌트가 정의된 jsx파일도 불러옴
//         (= 이를 통해 필요한 컴포넌트를 선별해, 레고조립하듯 끼워서 랜더링 할 수 있음)

// require('클래스명 or 파일명') : java의 import 클래스명 과 같은 역할 수행 (클래스 호출)

// React와 ReactDOM의 코드를 불러와서 씀(이미 npm을 통해 터미널에서 다운받음)
//  (= 더 이상 CDN방식으로 지저분하게 쓸 필요가 없다. 이 말..)
const React = require('react');
const ReactDom = require('react-dom');

// 컴포넌트명.jsx의 module.exports = WordRelay 코드를 통해, 해당 jsx파일 코드를 불러올 수 있음
// (= 해당 파일 내에 정의한 클래스 컴포넌트를 끌어다 쓸 수 있다는 이야기) 
const WordRelay = require('./WordRelay');

// jsx확장자의 좋은점 : 쓰면 사실상 react용 파일이라는걸 예측가능
ReactDom.render(<WordRelay />, document.querySelector("#root"));
