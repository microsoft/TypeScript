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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var X = (function () {
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
    __names(X.prototype, ["getSettings"]);
    return X;
}());
