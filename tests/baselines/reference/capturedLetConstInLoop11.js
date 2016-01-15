//// [capturedLetConstInLoop11.ts]
for (;;) {
    let x = 1;
    () => x;
}

function foo() {
    for (;;) {
        const a = 0;
        switch(a) {
            case 0: return () => a;
        }
    }
}

//// [capturedLetConstInLoop11.js]
var _loop_1 = function() {
    var x = 1;
    (function () { return x; });
};
for (;;) {
    _loop_1();
}
function foo() {
    var _loop_2 = function() {
        var a = 0;
        switch (a) {
            case 0: return { value: function () { return a; } };
        }
    };
    for (;;) {
        var state_2 = _loop_2();
        if (typeof state_2 === "object") return state_2.value
    }
}
