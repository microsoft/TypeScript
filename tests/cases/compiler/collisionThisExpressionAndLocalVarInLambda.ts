declare function alert(message?: any): void;

var x = {
    doStuff: (callback) => () => {
        var _this = 2;
        return callback(this);
    }
}
alert(x.doStuff(x => alert(x)));