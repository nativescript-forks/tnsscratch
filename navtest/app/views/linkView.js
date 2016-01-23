var color_1 = require("color");
var gestures_1 = require("ui/gestures");
var label_1 = require("ui/label");
var point_1 = require("../point");
//import {LinkViewOptions} from "./linkViewOptions";
var LinkView = (function (_super) {
    __extends(LinkView, _super);
    function LinkView(rect) {
        var _this = this;
        _super.call(this);
        this.rect = rect;
        //private _width: number = 50;
        //private _height: number = 50;
        this.lastLocation = new point_1.Point(0, 0);
        //this._width = options.width;
        //this._height = options.height;
        this.on(gestures_1.GestureTypes.pan, function (args) {
            switch (args.state) {
                case gestures_1.GestureStateTypes.began: {
                    _this.dragStarted();
                    break;
                }
                case gestures_1.GestureStateTypes.changed:
                    _this.dragged(args);
                    break;
                case gestures_1.GestureStateTypes.ended: {
                    _this.dragged(args);
                    _this.dradEnded();
                    break;
                }
            }
        });
        this.on(gestures_1.GestureTypes.longPress, function (args) {
            console.log('link view long press');
        });
        this.on(gestures_1.GestureTypes.tap, function (args) {
            console.log('link view tap');
        });
    }
    //View lifecycle
    LinkView.prototype.onMeasure = function (widthMeasureSpec, heightMeasureSpec) {
        //randomize color
        var blueValue = Math.floor(Math.random() * 255) + 1;
        var greenValue = Math.floor(Math.random() * 255) + 1;
        var redValue = Math.floor(Math.random() * 255) + 1;
        this.setMeasuredDimension(this.rect.size.width, this.rect.size.height);
        this.backgroundColor = new color_1.Color(255, redValue, greenValue, blueValue);
        this.color = new color_1.Color(255, redValue, greenValue, blueValue);
        //randomize location
        //let pointX = Math.floor(Math.random() * (this.parent.getMeasuredWidth() - this.rect.size.width)) + 1;
        //let pointY = Math.floor(Math.random() * (this.parent.getMeasuredHeight() - this.rect.size.height)) + 1
        this.translateX = this.rect.origin.x;
        this.translateY = this.rect.origin.y;
        //this.applyStationaryShadow();
    };
    //Private methods
    LinkView.prototype.dragged = function (args) {
        var translation = args.ios.translationInView(this.parent.ios);
        var newCenter = {
            x: this.lastLocation.x + translation.x,
            y: this.lastLocation.y + translation.y
        };
        this.ios.center = newCenter;
    };
    LinkView.prototype.dragStarted = function () {
        this.lastLocation.x = this.ios.center.x;
        this.lastLocation.y = this.ios.center.y;
        this.parent.ios.bringSubviewToFront(this.ios);
        this.applyRaisedShadow();
        this.animate({
            scale: {
                x: 1.5,
                y: 1.5
            },
            duration: 100
        });
    };
    LinkView.prototype.dradEnded = function () {
        this.applyStationaryShadow();
        this.animate({
            scale: {
                x: 1,
                y: 1
            },
            duration: 100
        });
    };
    LinkView.prototype.applyStationaryShadow = function () {
        if (this.ios) {
            this.ios.layer.shadowOffset = { height: 2, width: -2 };
            this.ios.layer.shadowRadius = 5;
            this.ios.layer.shadowOpacity = 0.3;
        }
    };
    LinkView.prototype.applyRaisedShadow = function () {
        if (this.ios) {
            this.ios.layer.shadowOffset = { height: 10, width: -10 };
            //this.ios.layer.shadowRadius = 5;
            this.ios.layer.shadowOpacity = 0.5;
        }
    };
    return LinkView;
})(label_1.Label);
exports.LinkView = LinkView;