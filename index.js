const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const router = require("./routes/diary"); //라우터 파일 경로

var app = express();
app
    .use(express.static(path.join(__dirname, 'public')))
    .use('/api/diary', router)   //사용할 api 호출 경로, 라우터 변수
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
