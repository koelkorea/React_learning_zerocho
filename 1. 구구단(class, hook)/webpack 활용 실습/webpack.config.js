const path = require('path');
const webpack = require('webpack');

module.exports = {

    mode : 'development',       // mode는 development(개발), production(실서비스)
    devtool : 'eval',           // eval은 별 의미없지만, '빠르게' 한다는 말

    resolve : {
        // entry의 app에서 타겟 파일 첨부시.. 확장자 입력이 귀칞을때.. 이 녀석에 적어두면 알아서 찾아서 인식해줌
        extensions : ['.js', '.jsx']
    },

     // (중요) entry는 [입력]될 jsx파일(합치고 싶은 jsx파일들)들을 의미 
     // : entry 내부에 해당되는 프로퍼티명.jsx와 client.jsx를 입력하면 됨
     //     -> 현재 client.jsx안에 WordRelay.jsx가 포함되는데, 이 경우 WordRelay.jsx는 포함 안 해도 webpack은 인식하고 잘 합쳐준다
     //     -> resolve 항목의 확장자를 넣어두면 일일히 확장자 안 붙여도 됨
    entry : {
        app : './client',
    },

    // (중요) modules는 입력되는 파일들에 뭔가를 적용하기 위해 작성
    //  - rules : 규칙을 적기 위해 사용
    //    1. test    : 어떤 이름을 가진 파일에 내용을 적용할지 정규식을 통해 작성
    //    2. loader  : 적용하는 패키지명
    //    3. options : 구체적으로 적용하고 싶은 녀석을 package.json에서 찾아 적는다
    //       -> plugins                       : 적용하는 싶은 플러그인 package.json에서 찾아 적는다
    //       -> presets (plugin들의 모음 의미) : 적용하고 싶은 복수의 플러그인들을 package.json에서 찾아 적는다
    //          => (중요) [ [ 'preset명', {속성명 : 설정명 : { 설정내용 } } ] , .... ] 이런 식으로 각 프리셋의 설정을 변경가능하다
    //              => https://github.com/browserslist/browserslist 를 참고하여 필요한 옵션 작성하면 됨
    module : {
        rules : [{
            test : /\.jsx?/,
            loader : 'babel-loader',
            options : {
                presets : [
                            // @babel/preset-env (babel이 컴파일 할 호환 환경 설정)의 설정 관련 
                            //  - target
                            //      1. last 2 chrome versions
                            //          : babel 환경을 크롬 최신 버전 중 2개 버전만 호환되게 만들겠다는 설정 
                            //            (babel에서 신경 쓸 구형 버전들이 늘어나면, 그만큼 빌드에 필요한 작업량도 늘어나기 때문에 필요할 수 있음)
                            //      2. > 5% in KR
                            //          : 한국 서 5%보다 큰 점유율만 babel에서 호환되게 컴파일한다는 설정
                            ['@babel/preset-env', {
                                targets : { 
                                    browsers : [' > 5% in KR', 'last 2 chrome versions'], 
                                }, 
                                debug : true,
                            } ],    
                            '@babel/preset-react'],
                plugins : ['@babel/plugin-proposal-class-properties']
            }
        }],
    },

    // plugins는 webpack의 기능(확장프로그램)을 통해 추가적으로 하고 싶은 작업 의미
    plugins : [
        // - new webpack.LoaderOptionsPlugin( { debug : true } )
        //   : 상단 module의 loader 항목에 쓰이는 option - preset의 각 항목의 모든 debug 속성의 설정은 true(작동)으로 변경 
        //     (이게 아니면 일일히  debug : true 넣어야함)
        new webpack.LoaderOptionsPlugin( { debug : true } ),
    ],

    // (중요) output는 [출력]될 jsx파일(합치고 난 뒤에 생성된 jsx파일명) 의미 
    //  : output 내부는  합체 후 생성될 js파일명이 위치할 경로를 입력해주면 됨 
    output : {
        //  path.join(__dirname, '폴더명')
        //   : 현재 폴더경로(__dirname)에 '폴더명'을 합친 경로를 만들어주는 편한 path 클래스의 메서드
        //     ex) __dirname = C:\면, C:\dist
        path : path.join(__dirname, 'dist'),
        filename : 'app.js',
    }, 

};