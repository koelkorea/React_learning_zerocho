// 컴포넌트명.jsx 
//  :  이 녀석은 사실상 개별 컴포넌트를 정의하는 용도로 사용
//     (= 컴포넌트의 수만큼 jsx의 수도 늘어난다고 보면 OK)
//     (= 몇만개나 되는걸 한 jsx에 놓는건 미친짓)

// require('클래스명 or 파일명') : java의 import 클래스명 과 같은 역할 수행 (클래스 호출)

// React 코드를 불러와서 씀(이미 npm을 통해 터미널에서 다운받음)
//  (= 더 이상 CDN방식으로 지저분하게 쓸 필요가 없다. 이 말..)
const React = require('react');

// 다음과 같은 코드를 통해..
//  -> class 컴포넌트 정의하는 과정에서 React.Component -> Component로 생략가능
const { Component } = React;

// class WordRelay extends React.Component {
class WordRelay extends Component {
    
    state = {
        word : '승호',
        value : '',
        result: '',
    };

    onSubmitForm = (e) => {
        e.preventDefault();

        if( this.state.word[this.state.word.length - 1] === this.state.value[0] ) {

            this.setState ({
                word : this.state.value,
                value : '',
                result : '정답입니다. 계속 이어나가세요',
            });

            this.input.focus();

        } else {

            this.setState ({
                value : '',
                result : '오답입니다. 잘 생각해보세요',
            });

            this.input.focus();

        }
    };

    onChangeInput = (e) => {
        this.setState({ value : e.currentTarget.value});
    };

    input;

    onRefInput = (c) => {
        this.input = c;
    }

    render() {
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit = {this.onSubmitForm}>
                    <input ref = {this.onRefInput} value = {this.state.value} onChange = {this.onChangeInput} />
                    <button>입력!</button>
                </form>
                <div>{this.state.result}</div>
            </>
        );
    };

}

// (중요) 웹팩(webpack.config.js)을 통해, 컴포넌트 파일을 개별로 쪼갤 경우 'module.exports = 클래스명' 코드는 필수적으로 들어가야 함  
//  -> 이 코드가 존재해야... 타 jsx 파일에서 정의해 둔 컴포넌트를 불러서 쓸수가 있기 때문! 
//     (거기 있는 module.exports 프로퍼티를 근거로 jsx들을 하나하나 합치는 것)
//      -> EX) require('./WordRelay')
module.exports = WordRelay;