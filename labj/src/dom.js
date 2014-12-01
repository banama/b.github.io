/**
 * Created by banama on 14-11-29.
 */
define(function(require, exports) {

    var $ = require('jquery');

    var Doms = (function () {

        function Dom() {
            var self = this;

            self.setting = {
                'height': 0,
                'maxHeight': 560,
                'page': 0,
                'step': 0
            }

            if(/Chrome/i.test(navigator.userAgent)) {
                self.browser = 1;
            }
            else if(/Firefox/i.test(navigator.userAgent)) {
                self.browser = 2;
            }
            else{
                self.browser = 0;
            }
        }

        // 构造出大的一面（两页），以及每页的左右两部分
        Dom.prototype.news = function () {
            var _ = "<div class='left'>" +
                    "<img class='bk-left' src='png/inpage_left_bk.png'>" +
                    "<div class='content_left'></div>" +
                    "<div class='content_right'></div>" +
                    "</div>" +
                    "<div class='right'>" +
                    "<img class='bk-right' src='png/inpage_right_bk.png'>" +
                    "<div class='content_left'></div>" +
                    "<div class='content_right'></div>" +
                    "</div>"
            return _
        }

        // 每日一句
        Dom.prototype.every = function (direct, data) {
            var _ = "<div class='every_" + direct + "'>" +
                    "<img src='png/day_bk_" + direct + ".png' class='day_bk_" + direct + "'>" +
                    "<div class='day_data_one'>" + data[0] + "<br>" + data[1] + "</div>" +
                    "<div class='day_data_two'>" + data[2] + "</div>" +
                    "<div class='day_data_three_" + direct + "'>" + "相恋" + data[4] + "天" + "</div>" +
                    "<div class='one_day_left'>" +
                    "<div class='one_day_" + direct + "_top'></div>" +
                    "<div class='one_day_" + direct + "_center'>" +
                    "<div class='one_day_" + direct + "_contenr'>" +
                    "<p>" + data[3] + "</p></div></div>" +
                    "<div class='one_day_" + direct + "_down'></div>" +
                    "</div>" +
                    "</div>"
            return _
        }

        // 纪念日
        // TODO 纪念日日期的显示
        Dom.prototype.mark = function (data) {
            var _ = "<div class='mark'>" +
                    "<img class='mark_img' src='png/favourite_day.png'>" +
                    "<p>" + data + "</p>" +
                    "</div>"
            return _
        }

        // 笔记的头部，心情、地点、时间等信息
        Dom.prototype.noteTop = function (data, direct) {

            var _emotion = data[0]
            switch (_emotion){
                case 0:
                    _emotion = "png/mood_smile@2x.png";
                case 1:
                    _emotion = "png/mood_anger@2x.png";
                    break;
                case 2:
                    _emotion = "png/mood_cry@2x.png";
                    break;
                case 3:
                    _emotion = "png/mood_horny@2x.png";
                    break;
                case 4:
                    _emotion = "png/mood_sad@2x.png";
                    break;
                case 5:
                    _emotion = "png/mood_smile@2x.png";
                    break;
                default :
                    _emotion = "png/mood_smile@2x.png";
                    break;
            }

            var d = "";
            if (data.length === 3) {
                d = "<img src='png/feed_note_location.png' class='note_location'>" +
                    "<p class='note'>" + data[2] + "</p>" +
                    "<div class='paddings_10'></div>"
            }

            var _ = "<div class='resource_one'>" +
                    "<img src='https://avatars1.githubusercontent.com/u/5638737?v=3&s=460' class='avatar'>" +
                    "<img src='" + _emotion + "' class='emotion'>" +
                    "<div class='resource_info_" + direct + "'>" + d +
                    "<img src='png/feed_note_time.png' class='note_time'>" +
                    "<p class='note'>" + data[1] + "</p>" +
                    "</div>"

            return _
        }

        // 文本笔记
        Dom.prototype.noteContent = function (data) {
            var _ = "<div class='resource'>" +
                    "<div class='note_content'><p>" + data + "</p></div></div>"
            return _
        }

        // 描述，样式中我没有看到，所以预留下这个方法
        //TODO description
        Dom.prototype.noteDescription = function(data){

        }

        // 图片笔记，多图处理也间接依赖这个方法。为了方便处理多图时判断
        // 是否overflow，所以每张图片为一块，文本视频，音频也是一样
        Dom.prototype.noteImage = function (url) {
            var _ = "<div class='resource'><img class='note_image' src='" + url + "'></div>"
            return _
        }

        // 音频笔记
        Dom.prototype.noteAudio = function (url) {
            var _ = ""
            if (self.browser  !== 2) {
                var _ = "<div class='resource'>" +
                        "<audio controls='controls' class='note_audio' >" +
                        "<source width='190' src='" + url + "' type='audio/mp3' />" +
                        "Your browser does not support this audio format." +
                        "</audio></div>"
            }
            return _
        }

        // 视频笔记
        Dom.prototype.noteVideo = function(url){
            var _ = ""
            if (self.browser  !== 2) {
                var _ = "<div class='resource'>" +
                        "<video controls='controls' class='note_video' >" +
                        "<source src='" + url + "' type='video/mp4' />" +
                        "Your browser does not support the video tag." +
                        "</video></div>"
            }
            return _
        }

        return Dom;
    })()

    exports.Dom = Doms;

});