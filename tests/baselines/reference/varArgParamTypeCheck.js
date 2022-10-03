//// [varArgParamTypeCheck.ts]
function sequence(...sequences:{():void;}[]) {
}

function callback(clb:()=>void) {
}

sequence(
    function bar() {
    },
    function foo() {
        callback(()=>{
            this();
        });
    },
    function baz() {
        callback(()=>{
            this();
        });
    }
);


//// [varArgParamTypeCheck.js]
function sequence() {
    var sequences = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        sequences[_i] = arguments[_i];
    }
}
function callback(clb) {
}
sequence(function bar() {
}, function foo() {
    var _this = this;
    callback(function () {
        _this();
    });
}, function baz() {
    var _this = this;
    callback(function () {
        _this();
    });
});
