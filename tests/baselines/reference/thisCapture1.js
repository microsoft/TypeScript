//// [thisCapture1.ts]
class X {
    private y = 0;
    public getSettings(keys: string[]): any {
        var ret: any;
        return ret.always(() => {
            this.y = 0;
        }).promise();
    }
}

//// [thisCapture1.js]
var X = /** @class */ (function () {
    function X() {
        this.y = 0;
    }
    X.prototype.getSettings = function (keys) {
        var _this = this;
        var ret;
        return ret.always(function () {
            _this.y = 0;
        }).promise();
    };
    return X;
}());
