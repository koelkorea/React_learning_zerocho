// 컴포넌트명.jsx 
//  :  이 녀석은 사실상 개별 컴포넌트를 정의하는 용도로 사용
//     (= 컴포넌트의 수만큼 jsx의 수도 늘어난다고 보면 OK)
//     (= 몇만개나 되는걸 한 jsx에 놓는건 미친짓)

// require('클래스명 or 파일명') : java의 import 클래스명 과 같은 역할 수행 (클래스 호출)

// React 코드를 불러와서 씀(이미 npm을 통해 터미널에서 다운받음)
//  (= 더 이상 CDN방식으로 지저분하게 쓸 필요가 없다. 이 말..)
const React = require('react');
const { useState, useRef } = React;

const GuGuDan = () => {
        
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');

    const inputRef = useRef(null);

    const onChangeInput = (e) => {
        setValue(e.target.value)
    };

    const onSubmitForm = (e) => {
    
        // onSubmit 이벤트가 작동되지 않게 막음 (여기서는 submit 이벤트를 통한 새로고침을 막음)
        e.preventDefault();

        // (로직 내용) 입력한 value값이 정답이냐? 아니냐?에 따라서 GuGudan 컴포넌트의 state 프로퍼티의 멤버변수들이 다르게 변경되게 함
        if( parseInt(value) === first * second ){

            // prev변수명 : 해당 변수 및 state값이 변경되기 전의 값을 의미 (ARROW함수의 파라미터로 들어올떄 인식)

            // hooks에서도 마찬가지로, prev변수명을 ARROW함수의 파라미터로 사용하여, 변경 이전의 값을 넣어줄것을 지정 가능하다
            setResult( (prevResult) => {
                return first + '*' + second + ' = ' + value 
                    + '는 정답이니! GO TO THE NEXT LEVEL!'
            });
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');

            // 앞서 선언한 React.useRef(초기값)을 통해 접근한 DOM요소의 위치값에 속성내용 추가해서 컴포넌트에 관여
            inputRef.current.focus();

        }else{
            setResult(first + '*' + second + ' = ' + value
                    + '는 틀렸으니, TRY AGAIN!');
            setValue('');

            // 앞서 선언한 React.useRef(초기값)을 통해 접근한 DOM요소의 위치값에 속성내용 추가해서  컴포넌트에 관여
            inputRef.current.focus();
        }
    };

    // [hooks의 단점]
    // : 한번 state값의 변화가 감지될 때마다 통째로 함수 컴포넌트 전체를 재실행하여 랜더링함 = 속도가 좀 느릴 수 있다
    //  -> 하지만 state값들을 개별 변수에 저장했다쳐도, 이들은 랜더링시 비동기 함수로 움직이기에, 결과적으로 dom에 모든 변경이 반영된 단 한번의 변경만 적용 (= Virtual Dom의 이점) 
    console.log("랜더링");

    return (

        // <div> 태그의 존재 의의
        //    : 초기 react에서는 이걸 써야 JSX 코드를 인식함.. (하지만 ㅈㄴ게 없애고 싶다면..)
        //      -> 해결법1. babel에서 해결시 그냥 <> 빈태그를 붙여도 됨
        //      -> 해결법2. <div> => <React.Fragment>로 대체

        // React.Fragment = <> 
        // : 해당 컴포넌트를 사용하면 render() 메서드 안에서 추가적인 DOM객체를 생성하지 않아도 여러 엘리먼트를 반환 가능
        //      -> 한 마디로 render()에서 <div>같은 DOM요소로 시작하지 않아도 JSX코드로 리턴가능
        <>
            <div>[webpack을 사용해 함수 컴포넌트로 구현한 구구단]</div>
            <div>{ first } 곱하기 { second }는?</div>
            <form onSubmit={ onSubmitForm }>
                <input ref={ inputRef } onChange={ onChangeInput } value={ value } />
                <button id="button" className="button" htmlFor="button">입력!</button>
            </form>
            <div id="result">{ result }</div>
        </>

        // React에서 사용할 수 없는 DOM 속성값
        // 1. class -> className : class는 이미 class 컴포넌트에 쓰이는 예약어
        // 2. for -> htmlFor
    );
};



// (중요) 웹팩(webpack.config.js)을 통해, 컴포넌트 파일을 개별로 쪼갤 경우 'module.exports = 클래스명' 코드는 필수적으로 들어가야 함  
//  -> 이 코드가 존재해야... 타 jsx 파일에서 정의해 둔 컴포넌트를 불러서 쓸수가 있기 때문! 
//     (거기 있는 module.exports 프로퍼티를 근거로 jsx들을 하나하나 합치는 것)
//      -> EX) require('./WordRelay')
module.exports = GuGuDan;