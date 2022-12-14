// [react에서 input 태그 내 속성과 state변수 작성법 (controlled input VS uncontrolled unput)]
//  -> 해당 문서는 uncontrolled input으로 작성 (= state 변수 중 value값은 구조할당 문법으로 적용X -> DOM을 통한 직접처리)

// - controlled input (추천) <-> uncontrolled unput (몰라도 됨)

//  (특징)   : 구조분해 할당을 통한 외부의 '함수형 컴포넌트 state 변수'를 state 변수가 onchange 이벤트를 통해 value의 속성값으로 jsx형식으로 통제(controlled)한다.
//              -> [uncontrolled의 경우]
//                   : '함수형 컴포넌트 state 변수 중 value' 사용X = setValue 사용 X
//                       ->  해당 값이 필요한 부분을 DOM위치값의 value속성으로 대체해야 함
//                            -> 만약 input태그에 초기값을 넣고 싶어도 value가 아니라 defalutValue 속성 사용해야함

//  (사용처) : 복잡한 페이지 제작에 사용됨(일반적) <-> uncontrolled의 경우는 간단한 페이지 제작에 사용 (특수적)
//                                                    = 경우 1. input 태그의 value부분이 특정한 구역 나에서만 (submit 폼 같은 태그 안에서) 사용되는 경우
//                                                    = 경우 2. submit폼에서 입력값에 대한 내용을 validating하는 상황 (submit 버튼 자체가 안 눌리게 하는건 불가능하다 이거... 눌린 상태에서 submit단에서 막는거)
//                                                      -> 그러니까 밑어거는 기존 방식인 controlled input에서만 가능하다는 말   
//                                                          ex) '비밀번호 4자 이상 초과 여부'를 즉각 확인한다던가 (instand field validation)
//                                                                  -> 그 결과로 submit 버튼을 막는다던가 (conditionally disabling submuit button)
//                                                                  -> 폼 자체의 색깔이 변한다던가 (dyanmic inputs)
//                                                                  -> 입력값의 형식을 강제한다던가 (enforcing input format)
//                                                                  -> input창을 여러개 만들어도 한 종류의 데이터를 입력받는다던가 (serveral inputs for one piece of data)



// 컴포넌트명.jsx 
//  :  이 녀석은 사실상 개별 컴포넌트를 정의하는 용도로 사용
//     (= 컴포넌트의 수만큼 jsx의 수도 늘어난다고 보면 OK)
//     (= 몇만개나 되는걸 한 jsx에 놓는건 미친짓)

// require('클래스명 or 파일명') : java의 import 클래스명 과 같은 역할 수행 (클래스 호출)

// React 코드를 불러와서 씀(이미 npm을 통해 터미널에서 다운받음)
//  (= 더 이상 CDN방식으로 지저분하게 쓸 필요가 없다. 이 말..)
const React = require('react');
const { useState, useRef } = React;

// [hooks의 단점]
//  1. 한번 state값의 변화가 감지될 때마다 통째로 함수 컴포넌트 전체를 재실행하여 랜더링함 = 속도가 좀 느릴 수 있다
//      -> 하지만 state값들을 개별 변수에 저장했다쳐도, 이들은 랜더링시 비동기 함수로 움직이기에, 결과적으로 dom에 모든 변경이 반영된 단 한번의 변경만 적용 (= Virtual Dom의 이점) 
//  2. hooks에서 ref속성 사용시 DOM조작을 위해서는 current를 반드시 써야함

// [hooks의 장점 정리]
//  1. hooks를 통해 함수 컴포넌트를 사용하면, class가 아닌 script변수에서 선언한 무명메서드처럼 작성이 가능
//     -> 결론적으로 함수에서 return한 값이 출력값 = return 내용이 곧 프론트단에서의 출력될 화면
//        (이걸로 class컴포넌트와 다르게 내부 메서드 없이 화면내용 상호작용)
//  2. hooks 사용시 arrow함수로 짜면 this를 쓸 필요가 없다 (= hooks를 쓰면 this랑 졸업해도 됨!)
//  3. state값 관리가 쉽다

// hook를 통한 함수 컴포넌트 형식으로 정의 (1장 hook 구구단 참고)
const WordRelay = () => {

    // [hooks 관여 1. Destructuring & useState() 통한 state값 사용선언] 
    //  : '구조분해' 할당을 통한 변수명과 set변수명을 통한 접근 & useState를 통해 해당 변수명을 state값으로 사용 선언

    // Q : Hooks를 통해, 어떻게 Functional 컴포넌트에서 setState()와 같이 state값 변경에 관여하는가?
    //  -> A : 구조분해(Destructuring) 할당을 통해 state값 이름과 set메서드 관여 + React.useState(초기값)을 통해 해당 state 프로퍼티의 초기값을 지정

    // (구) class 컴포넌트 코드
    // state = {
    //     word : '승호',
    //     value : '',
    //     result: '',
    // };

    // (신) hooks 사용 함수 컴포넌트 코드(구조분해 문법 적용)
    const [word, setWord] = useState('승호');
    const [result, setResult] = useState('');

    // -------------- <uncontrolled input을 위한 변경점 1 : value값이 state변수를 통해 통제 X -> dom위치값을 통해 직접 입력> --------------
    // const [value, setValue] = useState('');   
    //----------------------------------------------------------------------------------------------------


    // [hooks 관여 2. useRef(초기값) 통한, DOM요소 - 전역변수 간 연결고리 형성] 
    //  : React.useRef(초기값) : Hooks에서 Dom요소의 위치값에 접근하기 위해 사용하는 메서드
    //      -> 해당 코드를 DOM요소의 ref속성값으로 입력하면, 타 메서드에서 해당 코드는 키워드로 DOM요소 위치값(document.queryselector~)처럼 쓸 수 있고,
    //         그대로 DOM위치값.메서드()를 적용하여 해당 DOM을 동적으로 제어가능

    // (구) 이벤트리스너 this를 사용하여, 원하는 DOM요소와 ref속성을 연동하여 DOM요소 조작하는 코드
    // input;
    // onRefInput = (c) => {
    //     this.input = c;
    // }

    // (신) useRef(초기값)을 통한 임의 script 변수를 생성,  
    const inputRef = React.useRef(null);

    // 입력된 form을 보내고 난뒤 작동하는 이벤트 함수 (조건에 따라 state로 입력한 항목들의 값이 변경)
    const onSubmitForm = (e) => {
        e.preventDefault();

        // (구) 이벤트리스너 this를 사용, class 내 프로퍼티 인 state항목 사용 및 원하는 DOM요소와 ref속성을 연동하여 DOM요소 조작하는 코드
        // if( this.state.word[this.state.word.length - 1] === this.state.value[0] ) {

        //     this.setState ({
        //         word : this.state.value,
        //         value : '',
        //         result : '정답입니다. 계속 이어나가세요',
        //     });

        //     this.input.focus();

        // } else {

        //     this.setState ({
        //         value : '',
        //         result : '오답입니다. 잘 생각해보세요',
        //     });

        //     this.input.focus();

        // }

        // console.log(객체) : 이벤트리스너에 해당하는 객체의 내부 값 현황 체크가 html 형식으로 가능
        console.log(e.target.children.value); 

        // console.dir(객체) : 이벤트리스너에 해당하는 객체의 내부 값 현황 체크가 콘솔 형식으로 가능
        console.dir(e.target); 

        // -------------- <uncontrolled input을 위한 변경점 2 :  : state의 value값 X -> 이벤트리스너를 통해 원하는 DOM 위치의 값을 직접 찾아서 적용해야 함 > -------------------------------

        // (신) hooks 사용 : 함수 컴포넌트 코드(구조분해 문법 적용) + React.useRef(초기값) 적용된 script변수를 통한 dom요소 접근 및 제어코드
        // if( word[word.length - 1] === value[0] ) {       
        if( word[word.length - 1] === e.target.children.word.value[0] ) {  // uncontrolled input에서의 state값은 이벤트리스너를 통해 dom위치(word는 id값)를 찾는다.

            // setWord( value );                         // uncontrolled input에서의 value값은 state값이 아니기에, 
            e.target.children.word.value = '';           //    -> 직접 이벤트리스너를 통해 dom위치를 찾아 해당 위치의 value 속성값을 찾고
            setWord(e.target.children.word.value);       //       -> 이를 특정 setState값을 통해 넣는다.

            // setValue( '' );                           // value 값에 대한 state가 없으니 의미 없는 코드
            setResult( '정답입니다. 계속 이어나가세요' );

            // (중요) React.useRef(초기값).current.메서드() : hooks에서 ref속성 사용시 DOM조작을 위해서는 current를 반드시 써야함
            inputRef.current.focus();

        } else {

            // setWord( value );                         // uncontrolled input에서의 value값은 state값이 아니기에, 
            e.target.children.word.value = '';           //    -> 직접 이벤트리스너를 통해 dom위치를 찾아 해당 위치의 value 속성값을 찾고
            setWord(e.target.children.word.value);       //       -> 이를 특정 setState값을 통해 넣는다.

            setResult( '오답입니다. 잘 생각해보세요' );

            // (중요) React.useRef(초기값).current.메서드() : hooks에서 ref속성 사용시 DOM조작을 위해서는 current를 반드시 써야함
            inputRef.current.focus();

        }

        //---------------------------------------------------------------------------------------------------------------------------
    };

    // input에 들어가는 입력값 감지시 작동하는 이벤트 함수
    const onChangeInput = (e) => {

        // (구) class 내 프로퍼티 인 state항목 사용
        // this.setState({ value : e.currentTarget.value});

        // (신) 함수 컴포넌트 코드(구조분해 문법 적용)
        setValue(e.currentTarget.value);
    };


    // (구) class 컴포넌트 코드
    //   : class 형식이라 메서드를 통해 화면을 어떻게 출력할지를 제시해야함
    //       = render 메서드를 오버라이드 하는 형태로 화면에 대한 정보가 출력됨

    // render() {
    //     return (
    //         <>
    //             <div>{this.state.word}</div>             <- state 관련 변수 변경
    //             <form onSubmit = {this.onSubmitForm}>
    //                 <input ref = {this.onRefInput} value = {this.state.value} onChange = {this.onChangeInput} />     <- ref, state 관련 변수 변경
    //                 <button>입력!</button>
    //             </form>
    //             <div>{this.state.result}</div>           <- state 관련 변수 변경
    //         </>
    //     );
    // };

    // (신) hooks 함수 컴포넌트 코드 
    //   : 해당 WordRelay 변수 내 반환값을 화면으로서 html + jsx 문법을 통해 출력
    //      -> 이를 통해 state값이나 함수가 발동되어 화면에 변동이 생기면, return되는 출력문이 바뀌는 방식 (hooks의 장점 1번 참고)

    // uncontrolled input 방식
    //  : '함수형 컴포넌트 state 변수 중 value' 사용X = setValue 사용 X (= 이를 사용하는 메서드나 코드도 사용 불가이기에 여기서는 onchange 속성이 없어짐)
    //      ->  해당 값이 필요한 부분을 DOM위치값의 value속성으로 대체해야 함
    //          -> 만약 input태그에 초기값을 넣고 싶다면 defalutValue 속성 사용해야함
    return (
        <>
            <div>{word}</div>
            <form onSubmit = { onSubmitForm }>
                <label htmlFor='wordInput'>글자를 입력해라! 휴먼!</label>
                <input id = 'word' defalutValue = '' className='wordInput' ref = {inputRef} />
                <button>입력!</button>
            </form>
            <div>{result}</div>
        </>
    );

    // React에서 사용할 수 없는 DOM 속성값 (요즘은 잘 들어가는듯함)
    // 1. class -> className : class는 이미 class 컴포넌트에 쓰이는 예약어
    // 2. for -> htmlFor

}

// (중요) 웹팩(webpack.config.js)을 통해, 컴포넌트 파일을 개별로 쪼갤 경우 'module.exports = 클래스명' 코드는 필수적으로 들어가야 함  
//  -> 이 코드가 존재해야... 타 jsx 파일에서 정의해 둔 컴포넌트를 불러서 쓸수가 있기 때문! 
//     (거기 있는 module.exports 프로퍼티를 근거로 jsx들을 하나하나 합치는 것)
//      -> EX) require('./WordRelay')
module.exports = WordRelay;