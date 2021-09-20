var express = require('express');

var data = require('../model/diary'); //���̾ �� ��Ű���� �����´�(�����)

var bodyParser = require('body-parser'); //body�� json�� �Ľ����ִ¸��

var dateFormat = require('dateformat'); //��¥������ ���ϴ� ���·ιٲ��ִ� ���
var empty = require('is-empty'); //�� üũ ��� *.����:0��empty�� �Ǵ���
const stringify = require("json-stringify-pretty-compact"); //json ���� ���ڿ��� (��������)��ȯ���ִ� ���

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//��ü �����͸� �ҷ��ͼ� �׸񺰷� ���� : ���� ȣ���ּ� http://~~/api/diary/
router.get('/', function (req, res) {
    data.find(function(error, dairy){
        var resultData = "";

        //������ ����, ������� �ִٸ�
        if(!error && !empty(dairy)){
            resultData = dairy;
            // resultData = stringify(dairy);
        }
        res.json({result: empty(error), error:error, data:resultData});
    });
});

//id ������� ��ȸ�Ͽ� �����͸� 1�� �ҷ����� : ���� ȣ���ּ� http://~~/api/diary/id��
router.get('/:id', function (req, res) {
    data.findOne({_id:req.params.id}, function(error, dairy){
        var resultData = "";
        if(!error && !empty(dairy)){
            resultData = dairy;
        }
        res.json({result: empty(error), error:error, data:resultData});
    });
});

//�����͸� �߰��ϱ� : ���� ȣ���ּ� http://~~/api/diary/ + body������
router.post('/', function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    if(!empty(title) && !empty(content)) {
        var diaryData = new data();
        diaryData.title = title;
        diaryData.content = content;
        var now = new Date();
        diaryData.date = dateFormat(now, "yyyymmdd");
        diaryData.imgList = "";
        //�ܼ�â�� ���ؼ� �α׸� Ȯ���غ� �� �ִ�
        console.log("dairy content diaryData::" + diaryData);
        diaryData.save(function(error, resultData){
            res.json({result: empty(error), error:error, data:resultData});
        });
    }
    else {
        res.json({result: false, error:null, data:null});
    }
});

//id�� �����͸� ã�Ƽ� ���� : ���� ȣ���ּ� http://~~/api/diary/ + body������
router.put('/:id', function (req, res) {
    var title = req.body.title;
    var content = req.body.content;
    const id = req.params.id;
    if(!empty(id)) {
        data.findOneAndUpdate({_id: id}, {$set:
                { title: title, content: content }
        }, {returnNewDocument: true}, (error, doc) => {
            res.json({result: !error, error:error});
        });
    }
    else {
        res.json({result: false, error:null, data:null});
    }
});

//id�� ã�Ƽ� ���� : ���� ȣ���ּ� http://~~/api/diary/id��
router.delete('/:id', function (req, res) {
    const id = req.params.id;
    if(!empty(id)) {
        data.remove({_id: id}, function(error, resultData){
            res.json({result: empty(error), error:error, data:resultData});
        });
    }
    else {
        res.json({result: false, error:null, data:null});
    }
});
module.exports = router;