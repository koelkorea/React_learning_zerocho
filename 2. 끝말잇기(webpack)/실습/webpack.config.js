// webpack.config.js 
//  : 한마디로 webpack의 설정내용을 담고 있는 파일이라 보면 OK

// output의 경로를 위해 선언(node.js 기본 탑재)
const path = require('path');   // require('클래스명 or 파일명') 자체가 node.js의 문법

// : 타 jsx에서 'module.exports = 컴포넌트명'으로 선언된 코드들의 실질적 작동은 여기서 정의된대로 수행
module.exports = {
    name : 'wordrelay-setting', // name은 그렇게 중요한 프로퍼티 아니니 아무거나
    mode : 'development',       // mode는 development(개발), production(실서비스)
    devtool : 'eval',

    resolve : {
        // entry의 app에서 타겟 파일 첨부시.. 확장자 입력이 귀칞을때.. 이 녀석에 적어두면 알아서 찾아서 인식해줌
        extensions : ['.js', '.jsx']
    },

     // entry는 입력될 jsx파일(합치고 싶은 jsx파일들)들을 의미 
     // : entry 내부에 해당되는 프로퍼티명.jsx와 client.jsx를 입력하면 됨
     //     -> 현재 client.jsx안에 WordRelay.jsx가 포함되는데, 이 경우 WordRelay.jsx는 포함 안 해도 webpack은 인식하고 잘 합쳐준다
    entry : {
        // app : ['./client.jsx', 'WordRelay.jsx'],
        app : ['./client.jsx'],
    }, 

    // output는 출력될 jsx파일(합치고 난 뒤에 생성된 jsx파일명) 의미 
    //  : output 내부는  합체 후 생성될 js파일명이 위치할 경로를 입력해주면 됨 
    output : {
        //  path.join(__dirname, '폴더명')
        //   : 현재 폴더경로(__dirname)에 '폴더명'을 합친 경로를 만들어주는 편한 path 클래스의 메서드
        //     ex) __dirname = C:\면, C:\dist
        path : path.join(__dirname, 'dist'),
        filename : 'app.js',
    }, 

};