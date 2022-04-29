// @strictNullChecks: true

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
