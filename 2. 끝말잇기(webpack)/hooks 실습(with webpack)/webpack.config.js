// webpack.config.js 
//  : 한마디로 webpack의 설정내용을 담고 있는 파일이라 보면 OK

// output의 기본경로를 위해 선언(node.js 기본 탑재)
const path = require('path');   // require('클래스명 or 파일명') 자체가 node.js의 문법
const webpack = require('webpack'); // plugin에 있는 녀석이 해당 변수를 쓰니 webpack에 대한 라이브러리 import시키는 개념
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin'); // webpack 개발서버에서 react코드 hot reloading을 가능케 하는 플러그인 import 시키는 개념

// : 타 jsx에서 'module.exports = 컴포넌트명'으로 선언된 코드들의 실질적 작동은 여기서 정의된대로 수행
module.exports = {
    name : 'wordrelay-setting', // name은 그렇게 중요한 프로퍼티 아니니 아무거나
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
        // app : ['./client.jsx', 'WordRelay.jsx'],
        app : ['./client'],
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

                            // (17이후 추가)
                            // react-refresh/babel : babel이 작동할 때 hot reloading(서버에 코드 바뀐거 실시간 반영하여 작업)기능도 추가함
                plugins : ['@babel/plugin-proposal-class-properties', 'react-refresh/babel', ]
            }
        }],
    },

    // plugins는 webpack의 기능(확장프로그램)을 통해 추가적으로 하고 싶은 작업 의미
    plugins : [
        // - new webpack.LoaderOptionsPlugin( { debug : true } )
        //   : 상단 module의 loader 항목에 쓰이는 option - preset의 각 항목의 모든 debug 속성의 설정은 true(작동)으로 변경 
        //     (이게 아니면 일일히  debug : true 넣어야함)
        new webpack.LoaderOptionsPlugin( { debug : true } ),

        // (17이후 추가)
        // - new RefreshWebpackPlugin()
        //   : webpack 개발서버 관련 플러그인에 대한 내용을 객체화시켜 불러옴
        new RefreshWebpackPlugin(),
    ],

    // (중요) output는 [출력]될 jsx파일(합치고 난 뒤에 생성된 jsx파일명) 의미 
    //  : output 내부는 합체 후 생성될 js파일명이 위치할 경로를 입력해주면 됨 
    //     -> path       : 파일들이 생성될 실제 경로 (절대 경로)
    //        filename   : webpack을 통해 생성될 파일명
    //        publicPath : webpack-server 배포 빌드 할 때, 서버가 생성 및 사용하는 결과물(css, html, 플러그인 등)들이 위치한 하는 가상 경로 (상대 경로)
    output : {
        //  path.join(__dirname, '폴더명')
        //   : 현재 폴더경로(__dirname)에 '폴더명'을 합친 경로를 만들어주는 편한 path 클래스의 메서드
        //     ex) __dirname = C:\면, C:\dist
        path : path.join(__dirname, 'dist'),
        filename : 'app.js',
        publicPath: '/dist',
    }, 

    // (현재 webpack dev server 4.x 버전과 @pmmmwh 플러그인 5.x 버전의 변경사항 내용 적용)
    // devServer : 프론트엔트 개발서버 관련 설정 의미 (webpack을 통한 빌드의 결과물(소스코드)의 변경점을 감지하고 이를 서비스에 수정 반영해주는 hot reloading 기능 존재)
    //     -> hot            : hot reloading 기능 발동여부를 boolean값으로 입력
    //        static         : 실제로 존재하는 정적파일(정확히는 package.json의 main항목의 시작파일)들이 위치하는 곳의 경로 설정을 여기서 함 (단! xml 방식으로 { directory : ~~ }안에 추가함)
    //        devMiddleware  : 나중에서 webpack이 생성해주는 파일들이 위치하는 (개발서버에서는) 메모리 저장 경로 설정을 여기서 함 (단! xml 방식으로 { publicPath : ~~ }안에 추가함)
    //                          -> 애초에 서버와 배포 빌드 관련된 경로인 publicPath의 존재에 영향을 받을 수 밖에 없음
    devServer : {
        devMiddleware: { publicPath : '/dist' },
        //  path.resolve(__dirname, './폴더명 or 폴더명')
        //   : 현재 폴더경로(__dirname)에 '폴더명'을 합친 경로를 만들어주지만, 오른쪽에서 부터 읽을때 폴더가 감지되면 바로 반환... 상대경로일 경우 왼쪽의 경로에 포함시켜 출력
        static: { directory: path.resolve(__dirname) },
        hot: true
    },
};