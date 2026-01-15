// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/2185

function test1() {
    for (let v; ; ) { var v; }
}
function test2() {
    for (let v in []) { var v; }
}
function test3() {
    for (let v of []) { var v; }
}
function test4() {
    {
        let x;
        {
            var x;
        }
    }
}
function test5() {
    {
        {
            var x;
        }
        let x;
    }
}


