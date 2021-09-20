const mongoose = require('mongoose');

// import mongoose from "mongoose"; //���� �߻�

let url = "mongodb+srv://dbadm:" + encodeURIComponent("wish197***") + "@cl.lc08w.mongodb.net/db?retryWrites=true&w=majority";
mongoose.connect(url, { dbName: 'db' }, function(err) {
    console.log('err ::' + err);
});

//���̾ ������ �� ����
var Schema = mongoose.Schema; // �𸶼���

//������ ���´� { date : "2020131", title : "test2", imgList : "", content: "�ƾ�2" }
var diarySchema = new Schema(
    { date : String, title : String, imgList : String, content : String}
)

//���� ȣ���� �� �䷸�� ���ٽ�
module.exports = mongoose.model('diary', diarySchema, 'diary');
