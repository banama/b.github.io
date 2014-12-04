/**
 * Created by banama on 14-12-2.
 */

(function () {

    var Pageturn = (function () {

        function Pageturn(element, options) {
            var self = this;

            self.settings = $.extend({
                speed: 500,
                _speed : 500,
                autoPlay: false,
                autoPlayDirect: "right",
                autoPlaySpeed: 5000,
                loop: false
            }, options);
            self.element = $(element);
            self.width = self.element.width();
            self.page = self.element.children("div.pageturn");
            self.count = self.page.length;
            self.now = self.count > 0 ? 1 : 0;
            self.mark = 0;
            self.timer = undefined;
            self.interval = 10;
            self.task_queue = [];
            self.init();
        }

        Pageturn.prototype.init = function() {
            var self = this;

            if (self.count < 1) {
                return;
            };

            if(self.settings.autoPlay == true) {
                self.autoPlay();
                self.autoPlayPause();
                return;
            }

            self.setup();
            self.keyword();
        };

        Pageturn.prototype.setup = function () {
            var self = this;

            for( var i=0; i < self.page.length; i++) {
                var e = $(self.page[i]);
                e.css("position", "absolute");
                e.css("left", self.width * (e.attr("data-page") - 1));
            };

            self.taskQueue();
            self.build();
        };
        
        Pageturn.prototype.taskQueue = function () {
            var self = this;
            self.isRun = false;

            function f(self){
                setInterval(function () {
                    if (self.task_queue.length > 0 && !self.isRun) {
                        self.isRun = true;
                        self.task_queue.shift().call(self);
                    }
                }, 100);
            }

            f.call(self, self);
        }

        Pageturn.prototype.build = function () {
            var self = this;

            var _left = self.element.children("div.one"),
                _right = self.element.children("div.two");

            _left.click(function () {
                if (self.settings.loop){
                    self.task_queue.push(self.turnLeft);
                }
                else {
                    if (self.now - 1 > 0) {
                        self.task_queue.push(self.turnLeft);
                    }
                }
            });

            _left.mouseenter(function () {
                if (self.settings.loop){
                    self.task_queue.push(self.touchLeft);
                }
                else {
                    if (self.now - 1 > 0) {
                        self.task_queue.push(self.touchLeft);
                    }
                }
            });

            _left.mouseleave(function () {
                if (self.settings.loop){
                    self.task_queue.push(self.touchLeftOver);
                }
                else {
                    if (self.now - 1 > 0) {
                        self.task_queue.push(self.touchLeftOver);
                    }
                }

            });

            _right.click(function () {
                if (self.settings.loop) {
                    self.task_queue.push(self.turnRight);
                }
                else {
                    if (self.now + 1 <= self.count) {
                        self.task_queue.push(self.turnRight);
                    }
                }
            });

            _right.mouseenter(function () {
                if (self.settings.loop) {
                    self.task_queue.push(self.touchRight);
                }
                else {
                    if (self.now + 1 <= self.count) {
                        self.task_queue.push(self.touchRight);
                    }
                }
            });

            _right.mouseleave(function () {
                if (self.settings.loop) {
                    self.task_queue.push(self.touchRightOver);
                }
                else {
                    if (self.now + 1 <= self.count) {
                        self.task_queue.push(self.touchRight);
                    }
                }
            });
        };

        Pageturn.prototype.turnLeft = function () {
            var self = this;
            self.interval = 10;
            var move_width = self.width * 0.9 * self.interval/ self.settings.speed;
            var num;

            if (Number(self.now) === 1) {
                num = self.count;
            }
            else {
                num = String(Number(self.now) - 1);
            }

            var previous_ = "[data-page='" + num + "']",
                previous = $(previous_),
                left = previous.children("div.left"),
                right = previous.children("div.right");

            previous.css({
                "z-index": 1,
                "left": 0,
            });
            left.css({
                "left": 0,
                "width": self.width * 0.1/2,
            });
            right.css({
                "left": 0 - self.width/2 + self.width * 0.1,
                "z-index": -1
            });

            self.clock(function (move_width, resize) {
                left.css({
                    "width": Number(left.css("width").substring(0, left.css("width").length - 2)) + move_width/2
                });
                right.css({
                    "left":Number(right.css("left").substring(0, right.css("left").length - 2)) + move_width
                })

            }, move_width, self.interval, self.settings.speed, true, "left");
        };

        Pageturn.prototype.turnRight = function () {
            var self = this;
            self.interval = 10;
            var move_width = self.width * 0.9 * self.interval/ self.settings.speed;
            var turn_width = self.width * 0.1;
            var num;

            if (self.now === self.count) {
                num = 1
            }
            else {
                num = String(Number(self.now) + 1);
            }

            var __ = "[data-page='" + self.now + "']",
                _ = $(__),
                _left = _.children("div.left"),
                _right = _.children("div.right");

            var next_ = "[data-page='" + num + "']",
                next = $(next_),
                left = next.children("div.left"),
                right = next.children("div.right");

            next.css({
                "z-index": 1,
                "left": 0
            });
            left.css({
                "left": self.width - turn_width,
                "width": turn_width/2,
                "z-index":1
            });

            self.clock(function(move_width, resize, direct){
                _.css({
                    "width": Number(_.css("width").substring(0, _.css("width").length - 2)) - move_width
                });

                left.css({
                    "width": Number(left.css("width").substring(0, left.css("width").length - 2)) + move_width/2,
                    "left": Number(left.css("left").substring(0, left.css("left").length - 2)) - move_width
                });

            }, move_width, self.interval, self.settings.speed, true, "right");

        };

        Pageturn.prototype.touchLeft = function () {
            var self = this;
            self.interval = 10;
            var move_width = self.width * 0.1 * self.interval/ self.settings._speed;
            var num;

            if (Number(self.now) === 1) {
                num = self.count;
            }
            else {
                num = String(Number(self.now) - 1);
            }

            var previous_ = "[data-page='" + num + "']",
                previous = $(previous_),
                left = previous.children("div.left"),
                right = previous.children("div.right");

            previous.css({
                "z-index": 1,
                "left": 0,
            });
            left.css({
                "left": 0,
                "width": 0,
            });
            right.css({
                "left": 0 - self.width/2,
                "z-index": -1
            });

            self.clock(function (move_width, resize) {
                left.css({
                    "width": Number(left.css("width").substring(0, left.css("width").length - 2)) + move_width/2
                });
                right.css({
                    "left":Number(right.css("left").substring(0, right.css("left").length - 2)) + move_width
                })

            }, move_width, self.interval, self.settings._speed, false);

        };

        Pageturn.prototype.touchLeftOver = function () {
            var self = this;
            self.interval = 10;
            var move_width = self.width * 0.1 * self.interval/ self.settings._speed;
            var num;

            if (Number(self.now) === 1) {
                num = self.count;
            }
            else {
                num = String(Number(self.now) - 1);
            }

            var previous_ = "[data-page='" + num + "']",
                previous = $(previous_),
                left = previous.children("div.left"),
                right = previous.children("div.right");

            self.clock(function (move_width, resize) {
                left.css({
                    "width": Number(left.css("width").substring(0, left.css("width").length - 2)) - move_width/2
                })
                right.css({
                    "left":Number(right.css("left").substring(0, right.css("left").length - 2)) - move_width
                })

            }, move_width, self.interval, self.settings._speed, false);

        };

        Pageturn.prototype.touchRight = function () {
            var self = this;
            self.interval = 10;
            var move_width = self.width * 0.1 * self.interval/ self.settings._speed;
            var num;

            if (self.now === self.count) {
                num = 1
            }
            else {
                num = String(Number(self.now) + 1);
            }

            var __ = "[data-page='" + self.now + "']",
                _ = $(__);

            var next_ = "[data-page='" + num + "']",
                next = $(next_),
                left = next.children("div.left");

            next.css({
                "z-index": 1,
                "left": Number(next.css("width").substring(0, next.css("width").length - 2)) - self.width
            });
            left.css({
                "left": self.width,
                "width": 0,
                "z-index":1
            });

            self.clock(function(move_width, resize){

                _.css({
                    "width": Number(_.css("width").substring(0, _.css("width").length - 2)) - move_width
                });

                left.css({
                    "width": Number(left.css("width").substring(0, left.css("width").length - 2)) + move_width/2,
                    "left": Number(left.css("left").substring(0, left.css("left").length - 2)) - move_width
                });

            }, move_width, self.interval, self.settings._speed, false);

        };

        Pageturn.prototype.touchRightOver = function () {
            var self = this;
            self.interval = 10;
            var move_width = self.width * 0.1 * self.interval / self.settings._speed;
            var num_ = String(Number(self.now));
            var num;
            if (self.now === self.count) {
                num = 1
            }
            else {
                num = String(Number(self.now) + 1);
            }

            var __ = "[data-page='" + self.now + "']",
                _ = $(__);

            var next_ = "[data-page='" + num + "']",
                next = $(next_),
                left = next.children("div.left");

            self.clock(function(move_width, resize){
                _.css({
                    "width": Number(_.css("width").substring(0, _.css("width").length - 2)) + move_width
                });

                left.css({
                    "width": Number(left.css("width").substring(0, left.css("width").length - 2)) - move_width/2,
                    "left": Number(left.css("left").substring(0, left.css("left").length - 2)) + move_width
                });

            }, move_width, self.interval, self.settings._speed, false);

        };

        Pageturn.prototype.resize = function(direct){
            var self = this;

            if (direct === "left") {
                if (self.settings.loop && self.now == 1) {
                    self.now = self.count;
                }
                else {
                    self.now -= 1;
                }
            }
            else {
                if (self.settings.loop && self.now == 1) {
                    self.now = 1;
                }
                else {
                    self.now += 1;
                }
            }

            for(var i=1; i <= self.count; i++){
                var _ = "[data-page='" + i + "']";
                $(_).css({
                    "width": self.width,
                    "left": (i - self.now) * self.width,
                    "z-index":0
                });
                $(_).children(".left").css({
                    "width": self.width/2,
                    "left": 0,
                    "z-index":0
                });
                $(_).children(".right").css({
                    "width": self.width/2,
                    "left": self.width/2,
                    "z-index": 0
                });
            }
        };

        Pageturn.prototype.clock = function(f, width, interval, time, resize, direct){
            var self = this;
            var offset = 0;
            clearInterval(self.timer);
            self.timer = setInterval(function () {
                offset += 10;
                f(width);
                if (offset >= time) {
                    self.clockStop(resize, direct)
                }
            }, interval);
        };

        Pageturn.prototype.clockStop = function(resize, direct){
            var self = this;
            clearInterval(self.timer);

            if (resize) {
                self.resize(direct);
            }
            self.isRun = false;
        };

        Pageturn.prototype.autoPlay = function(){
            var self = this;

            if (self.settings.autoPlayDirect === "right") {
                setTimeout(function () {
                    self.turnRight();
                }, 1000);
            }

        };

        Pageturn.prototype.autoPlayPause = function(){

        };

        Pageturn.prototype.keyword = function(){

        };

        return Pageturn;

    })();

    $.fn.pagetutrn = function (options) {
        return new Pageturn(this, options);
    }

}).call(this);