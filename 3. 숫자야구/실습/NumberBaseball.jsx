// 컴포넌트명.jsx 
//  :  이 녀석은 사실상 개별 컴포넌트를 정의하는 용도로 사용
//     (= 컴포넌트의 수만큼 jsx의 수도 늘어난다고 보면 OK)
//     (= 몇만개나 되는걸 한 jsx에 놓는건 미친짓)

// (구) (중요!) es 15 문법의 import, export 의미
//  : export ~~ 를 통해 컴포넌트나 파일을 구조분해 하면.. -> import ~~를 통해 얘를 불러올 수 있다.

// 1. import '파일명' (from '변수') : node.js의 모듈 시스템 (구) 과거에 썼던 자바랑 유사한 구문
//      -> require('클래스명 or 파일명')와 호환 가능

// React 코드를 불러와서 씀(이미 npm을 통해 터미널에서 다운받음)
// const React = require('react'); // import React from 'react'; 와 비슷한 의미 (과거 소스를 볼떄를 대비해서 알아두자)
// const { Component } = React;    // class 컴포넌트 정의하는 과정에서 React.Component -> Component로 생략가능

// import 적용한 코드로 대체한 결과
import React, { Component } from 'react';   // import React from 'react';   import { Component } from 'react';

class NumberBaseball {

}


// 2. export : node.js의 모듈 시스템으로 '객체'나 '배열'을 구조분해 하는 문법 (= 나중에 import로 불러오기 위한 포석)
//  (1) export defalut '클래스명 or 파일명'         :  import '파일명' from '클래스 및 파일명'으로 다른 파일에서 불러 쓸수 있음 (단! 1번만 선언 가능)
//  (2) export const '변수명' = '클래스명 or 파일명' : import { '파일명' }으로 다른 파일에서 불러 쓸수 있음 (여러번 사용 가능)

// (중요) 웹팩(webpack.config.js)을 통해, 컴포넌트 파일을 개별로 쪼갤 경우 'module.exports = 클래스명' 코드는 필수적으로 들어가야 함  
//  -> 이 코드가 존재해야... 타 jsx 파일에서 정의해 둔 컴포넌트를 불러서 쓸수가 있기 때문! 
//     (거기 있는 module.exports 프로퍼티를 근거로 jsx들을 하나하나 합치는 것)
//      -> EX) require('./WordRelay')
// module.exports = NumberBaseball;    //  (= export defalut NumberBaseball;)

// export 적용한 코드로 대체한 결과
export default NumberBaseball;          // 추후 import NumberBaseball; 로 가져올 수 있음
export const example = 'example';       // 추후 import { example }; 로 가져올 수 있음
