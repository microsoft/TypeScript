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
