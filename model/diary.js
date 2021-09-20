const mongoose = require('mongoose');

// import mongoose from "mongoose"; //에러 발생

let url = "mongodb+srv://dbadm:" + encodeURIComponent("wish197***") + "@cl.lc08w.mongodb.net/db?retryWrites=true&w=majority";
mongoose.connect(url, { dbName: 'db' }, function(err) {
    console.log('err ::' + err);
});

//다이어리 데이터 모델 설정
var Schema = mongoose.Schema; // 언마샬링

//데이터 형태는 { date : "2020131", title : "test2", imgList : "", content: "아아2" }
var diarySchema = new Schema(
    { date : String, title : String, imgList : String, content : String}
)

//나를 호출할 때 요렇게 갖다써
module.exports = mongoose.model('diary', diarySchema, 'diary');
