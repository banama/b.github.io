/**
 * Created by banama on 14-11-29.
 */
define(function(require){

    var dom = require("./dom");
    var db = require('dumpdata');

    var labj = (function () {

        function Labj() {
            var self = this;
            self.db = random_data().data.activities;
            self.dom = new dom.Dom();
            self.begin = self.db[0].date.length > 10 ? self.db[0].date.substring(0, 10) : self.db[0].date;
            self.init();
        }

        Labj.prototype.init = function () {
            var self = this;
            self.page();

            for (var i = 0; i < self.db.length; i++) {
                self.setup(self.db[i]);
            }
        };

        Labj.prototype.setup = function (data) {
            var self = this;

            switch (data.content_type) {
                case 3:
                    self.preEvery(data);
                    break;
                case 2:
                    self.preMark(data);
                    break;
                case 1:
                    self.preNote(data);
                    break;
            }
        };

        // 判断是否overflow
        Labj.prototype.overflows = function (f, data) {
            var self = this;
            self.dom.setting.height = self._.height();
            if (self.dom.setting.height > self.dom.setting.maxHeight) {
                var lasts = self._.children("div");
                lasts.last().remove();
                self.step();
                f.call(self, data);
            }
        };

        // 每面有两大页，四小页，每小页标记step为1、2、3、4
        // 如果overflow，跳到下一小页，四页都满，跳到新一面
        Labj.prototype.step = function () {
            var self = this;

            if (self.dom.setting.step < 4) {
                self.dom.setting.step += 1;
                self._.removeAttr("id");

                if (self.dom.setting.step === 2 || self.dom.setting.step === 4) {
                    self._ = self._.next();
                }
                if (self.dom.setting.step === 3) {
                    self._ = $(self._.parent().next().children()[1]);
                }
                self._.attr("id", "activity");
            }
            else {
                self._.removeAttr("id");
                self.page();
            }

        };

        // 相恋时间
        Labj.prototype.time = function (data) {
            var self = this;

            var begin = self.begin.split("-");
            var now = data.split("-");
            var _begin = new Date(begin[0], begin[1], begin[2]);
            var _now = new Date(now[0], now[1], now[2]);

            return (_now.getTime() - _begin.getTime()) / 1000 / 3600 / 24 + 1;
        };

        // 对每日一句所需数据进行预处理，结合overflow和每日一句方法构造页面
        Labj.prototype.preEvery = function (param) {
            var self = this;

            var data = param.date.split("-");
            data.push(param.content.content);
            data.push(self.time(param.date));

            self.every(data);
            self.overflows(self.every, data);
        };

        // 同每日一句preEvery方法
        Labj.prototype.preMark = function (parma) {
            var self = this;
            var data = parma.content.description;

            self.mark(data);
            self.overflows(self.mark, data);
        };

        // 同每日一句preEvery方法（多图额外处理，overflow在其DOM方法中处理）
        Labj.prototype.preNote = function (parma) {
            var self = this;
            var data_top = [];
            var gender;
            var d;
            if (parma.gender === 1) {
                gender = "one";
            }
            else {
                gender = "two";
            }
            data_top.push(gender);
            data_top.push(parma.content.extra.emotion);
            data_top.push(" " + parma.date.split(":")[0] + ":" + parma.date.split(":")[1]);
            if ("location_name" in parma.content.extra) {
                data_top.push(parma.content.extra.location_name);
            }

            self.noteTop(data_top);
            self.overflows(self.noteTop, data_top);

            var type = parma.content.resource_type;
            switch (type) {
                case 1:
                    d = parma.content.resource.content;
                    self.noteContent(d);
                    self.overflows(self.noteContent, d);
                    break;
                case 2:
                    d = [];
                    d.push("http://" + parma.content.resource.host + '/' + parma.content.resource.path);
                    d.push(parma.content.resource.width);
                    d.push(parma.content.resource.height);

                    self.noteImage(d);
                    self.overflows(self.noteImage, d);
                    break;
                case 3:
                    d = "http://" + parma.content.resource.host + '/' + parma.content.resource.path;
                    self.noteAudio(d);
                    self.overflows(self.noteAudio, d);
                    break;
                case 4:
                    d = "http://" + parma.content.resource.host + '/' + parma.content.resource.path;
                    self.noteVideo(d);
                    self.overflows(self.noteVideo, d);
                    break;
                case 5:
                    self.noteImages(parma);
                    break;
            }

        };

        // "面"的DOM操作，以及data－＊属性
        Labj.prototype.page = function () {
            var self = this;

            var page = self.dom.setting.page += 1;
            var html = "<div class='labj' data-page=" + page + "></div>";
            $(".main").append(html);

            var now = "[data-page=" + page + "]";
            var now_step = $(now);
            var news = self.dom.news();
            now_step.append(news);

            var _ll = $(now_step.find("div.content_left")[0]);
            var _lr = $(now_step.find("div.content_left")[1]);
            var _rl = $(now_step.find("div.content_right")[0]);
            var _rr = $(now_step.find("div.content_right")[1]);

            _ll.attr("data-step", 1);
            _ll.attr("id", "activity");
            _rl.attr("data-step", 3);
            _lr.attr("data-step", 2);
            _rr.attr("data-step", 4);

            self._ = $("#activity");
            self.dom.setting.step = 1;
        };

        // 每日一句DOM
        Labj.prototype.every = function (data) {
            var self = this;
            var direct;

            if (self.dom.setting.step <= 2) {
                direct = "left";
            }
            else {
                direct = "right";
            }
            var every = self.dom.every(direct, data);
            self._.append(every);

        };

        // 纪念日DOM
        Labj.prototype.mark = function (data) {
            var self = this;

            var mark = self.dom.mark(data);
            self._.append(mark);

        };

        // 笔记“头部”DOM
        Labj.prototype.noteTop = function (data) {
            var self = this;
            var direct;

            if (self.dom.setting.step <= 2) {
                direct = "left";
            }
            else {
                direct = "right";
            }
            var note = self.dom.noteTop(data, direct);
            self._.append(note);
        };

        // TODO 太长的图片显示缩略图，点击查看大图
        // 笔记图片DOM
        // 给img及其父元素加上width和height，控制图片显示，以及文档流的高度判断
        Labj.prototype.noteImage = function (data) {
            var self = this;
            var _width = data[1];
            var _height = data[2];

            if (_width < 178) {
                if ((178 * _height) / _width > 530) {
                    _width = (_width * 530) / _height;
                    _height = 530;
                }
                else {
                    _width = 178;
                    _height = (178 * _height) / _width;
                }
            }
            else {
                if ((178 * _height) / _width > 530) {
                    _height = 530;
                    _width = (530 * _width) / _height;
                }
                else {
                    _height = (178 * _height / _width);
                    _width = 178;
                }
            }

            var image = self.dom.noteImage(data[0]);
            self._.append(image);
            var img = self._.children("div").last().children("img");
            var div = self._.children("div").last();
            img.css("width", _width);
            img.css("height", _height);
            div.css("width", _width + 12);
            div.css("height", _height + 30);
        };

        // 多图处理，调用单图处理的方法
        Labj.prototype.noteImages = function (parma) {
            var self = this;

            var images = parma.content.resource.images;
            for (var i = 0; i < images.length; i++) {
                var d = [];
                d.push('http://' + images[i].host + '/' + images[i].path);
                d.push(images[i].width);
                d.push(images[i].height);

                self.noteImage(d);
                self.overflows(self.noteImage, d);
            }
        };

        // 文本笔记DOM
        Labj.prototype.noteContent = function (data) {
            var self = this;

            var content = self.dom.noteContent(data);
            self._.append(content);
        };

        // TODO Description
        // 笔记描述DOM
        Labj.prototype.noteDescription = function (data) {
            var self = this;
        };

        //  音频笔记DOM
        Labj.prototype.noteAudio = function (url) {
            var self = this;

            var audio = self.dom.noteAudio(url);
            self._.append(audio);
        };

        // 视频笔记DOM
        Labj.prototype.noteVideo = function (url) {
            var self = this;

            var video = self.dom.noteVideo(url);
            self._.append(video);
        };

        return Labj;
    })();
    new labj();
});