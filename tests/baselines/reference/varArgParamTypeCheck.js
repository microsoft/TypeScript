//// [tests/cases/compiler/varArgParamTypeCheck.ts] ////

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
function sequence(...sequences) {
}
function callback(clb) {
}
sequence(function bar() {
}, function foo() {
    callback(() => {
        this();
    });
}, function baz() {
    callback(() => {
        this();
    });
});
