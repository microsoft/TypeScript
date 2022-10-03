declare function alert(message?: any): void;
var x = {
    doStuff: (callback) => () => {
        var _this = 2;
        return callback(_this);
    }
}
alert(x.doStuff(x => alert(x)));