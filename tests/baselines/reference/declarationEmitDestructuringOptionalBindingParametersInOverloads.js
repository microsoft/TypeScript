//// [tests/cases/compiler/declarationEmitDestructuringOptionalBindingParametersInOverloads.ts] ////

//// [declarationEmitDestructuringOptionalBindingParametersInOverloads.ts]
function foo([x, y, z] ?: [string, number, boolean]);
function foo(...rest: any[]) {
}

function foo2( { x, y, z }?: { x: string; y: number; z: boolean });
function foo2(...rest: any[]) {

}

//// [declarationEmitDestructuringOptionalBindingParametersInOverloads.js]
function foo() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
}
function foo2() {
    var rest = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        rest[_i] = arguments[_i];
    }
}


//// [declarationEmitDestructuringOptionalBindingParametersInOverloads.d.ts]
declare function foo([x, y, z]?: [string, number, boolean]): any;
declare function foo2({ x, y, z }?: {
    x: string;
    y: number;
    z: boolean;
}): any;
