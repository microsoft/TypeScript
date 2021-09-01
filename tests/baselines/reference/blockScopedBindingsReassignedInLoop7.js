//// [blockScopedBindingsReassignedInLoop7.ts]
function f1() {
    function func(a:()=>void){

    }
    for (let i = 0; func(() => console.log(i)), i < 100;i++) {
        
    }
}

//// [blockScopedBindingsReassignedInLoop7.js]
function f1() {
    function func(a) {
    }
    var _loop_1 = function (i) {
        if (inc_1)
            i++;
        else
            inc_1 = true;
        if (!(func(function () { return console.log(i); }), i < 100))
            return out_i_1 = i, "break";
        out_i_1 = i;
    };
    var out_i_1, inc_1 = false;
    for (var i = 0;;) {
        var state_1 = _loop_1(i);
        i = out_i_1;
        if (state_1 === "break")
            break;
    }
}
