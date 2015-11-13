// @declaration: true

interface Base {
    x: string;
    y: number;
}

interface HelloOrWorld extends Base {
    p1: boolean;
}

interface JustHello extends Base {
    p2: boolean;
}

interface JustWorld extends Base {
    p3: boolean;
}

let hello: "hello";
let world: "world";
let helloOrWorld: "hello" | "world";

function f(p: "hello"): JustHello;
function f(p: "hello" | "world"): HelloOrWorld;
function f(p: "world"): JustWorld;
function f(p: string): Base;
function f(...args: any[]): any {
    return undefined;
}

let fResult1 = f(hello);
let fResult2 = f(world);
let fResult3 = f(helloOrWorld);

function g(p: string): Base;
function g(p: "hello"): JustHello;
function g(p: "hello" | "world"): HelloOrWorld;
function g(p: "world"): JustWorld;
function g(...args: any[]): any {
    return undefined;
}

let gResult1 = g(hello);
let gResult2 = g(world);
let gResult3 = g(helloOrWorld);