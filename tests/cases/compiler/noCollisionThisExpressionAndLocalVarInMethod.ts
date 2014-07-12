var _this = 2;
class a {
    method1() {
        return {
            doStuff: (callback) => () => {
                var _this = 2;
                return callback(_this);
            }
        }
    }
    method2() {
        var _this = 2;
        return {
            doStuff: (callback) => () => {
                return callback(_this);
            }
        }
    }
}