// Missing properties
function f1() {
    var { x, y } = {};
    var { x = 1, y } = {};
    var { x, y = 1 } = {};
    var { x = 1, y = 1 } = {};
}

// Missing properties
function f2() {
    var x: number, y: number;
    ({ x, y } = {});
    ({ x: x = 1, y } = {});
    ({ x, y: y = 1 } = {});
    ({ x: x = 1, y: y = 1 } = {});
}

// Excess properties
function f3() {
    var { } = { x: 0, y: 0 };
    var { x } = { x: 0, y: 0 };
    var { y } = { x: 0, y: 0 };
    var { x, y } = { x: 0, y: 0 };
}

// Excess properties
function f4() {
    var x: number, y: number;
    ({ } = { x: 0, y: 0 });
    ({ x } = { x: 0, y: 0 });
    ({ y } = { x: 0, y: 0 });
    ({ x, y } = { x: 0, y: 0 });
}
