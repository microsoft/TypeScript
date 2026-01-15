class class1 {
    get a(): number {
        var x2 = {
            doStuff: (callback) => () => {
                var _this = 2;
                return callback(_this);
            }
        }

        return 10;
    }
    set a(val: number) {
        var x2 = {
            doStuff: (callback) => () => {
                var _this = 2;
                return callback(_this);
            }
        }

    }
}

class class2 {
    get a(): number {
        var _this = 2;
        var x2 = {
            doStuff: (callback) => () => {
                return callback(_this);
            }
        }

        return 10;
    }
    set a(val: number) {
        var _this = 2;
        var x2 = {
            doStuff: (callback) => () => {
                return callback(_this);
            }
        }

    }
}