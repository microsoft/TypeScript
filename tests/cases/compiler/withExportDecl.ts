//@module: amd
// @declaration: true
var simpleVar;
export var exportedSimpleVar;

var anotherVar: any;
var varWithSimpleType: number;
var varWithArrayType: number[];

var varWithInitialValue = 30;
export var exportedVarWithInitialValue = 70;

var withComplicatedValue = { x: 30, y: 70, desc: "position" };
export var exportedWithComplicatedValue = { x: 30, y: 70, desc: "position" };

declare var declaredVar;
declare var declareVar2

declare var declaredVar;
declare var deckareVarWithType: number;
export declare var exportedDeclaredVar: number;

var arrayVar: string[] = ['a', 'b'];

export var exportedArrayVar: { x: number; y: string; }[] ;
exportedArrayVar.push({ x: 30, y : 'hello world' });

function simpleFunction() {
    return {
        x: "Hello",
        y: "word",
        n: 2
    };
}

export function exportedFunction() {
    return simpleFunction();
}

module m1 {
    export function foo() {
        return "Hello";
    }
}
export declare module m2 {

    export var a: number;
}


export module m3 {

    export function foo() {
        return m1.foo();
    }
}

export var eVar1, eVar2 = 10;
var eVar22;
export var eVar3 = 10, eVar4, eVar5;