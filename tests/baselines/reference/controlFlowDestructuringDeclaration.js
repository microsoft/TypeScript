//// [controlFlowDestructuringDeclaration.ts]
function f1() {
    let x: string | number = 1;
    x;
    let y: string | undefined = "";
    y;
}

function f2() {
    let [x]: [string | number] = [1];
    x;
    let [y]: [string | undefined] = [""];
    y;
    let [z = ""]: [string | undefined] = [undefined];
    z;
}

function f3() {
    let [x]: (string | number)[] = [1];
    x;
    let [y]: (string | undefined)[] = [""];
    y;
    let [z = ""]: (string | undefined)[] = [undefined];
    z;
}

function f4() {
    let { x }: { x: string | number } = { x: 1 };
    x;
    let { y }: { y: string | undefined } = { y: "" };
    y;
    let { z = "" }: { z: string | undefined } = { z: undefined };
    z;
}

function f5() {
    let { x }: { x?: string | number } = { x: 1 };
    x;
    let { y }: { y?: string | undefined } = { y: "" };
    y;
    let { z = "" }: { z?: string | undefined } = { z: undefined };
    z;
}

function f6() {
    let { x }: { x?: string | number } = {};
    x;
    let { y }: { y?: string | undefined } = {};
    y;
    let { z = "" }: { z?: string | undefined } = {};
    z;
}

function f7() {
    let o: { [x: string]: number } = { x: 1 };
    let { x }: { [x: string]: string | number } = o;
    x;
}


//// [controlFlowDestructuringDeclaration.js]
function f1() {
    var x = 1;
    x;
    var y = "";
    y;
}
function f2() {
    var x = [1][0];
    x;
    var y = [""][0];
    y;
    var _a = [undefined][0], z = _a === void 0 ? "" : _a;
    z;
}
function f3() {
    var x = [1][0];
    x;
    var y = [""][0];
    y;
    var _a = [undefined][0], z = _a === void 0 ? "" : _a;
    z;
}
function f4() {
    var x = { x: 1 }.x;
    x;
    var y = { y: "" }.y;
    y;
    var _a = { z: undefined }.z, z = _a === void 0 ? "" : _a;
    z;
}
function f5() {
    var x = { x: 1 }.x;
    x;
    var y = { y: "" }.y;
    y;
    var _a = { z: undefined }.z, z = _a === void 0 ? "" : _a;
    z;
}
function f6() {
    var x = {}.x;
    x;
    var y = {}.y;
    y;
    var _a = {}.z, z = _a === void 0 ? "" : _a;
    z;
}
function f7() {
    var o = { x: 1 };
    var x = o.x;
    x;
}
