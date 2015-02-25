//// [declarationEmitDestructuringOptionalBindingParametersInOverloads.ts]

function foo([x, y, z] ?: [string, number, boolean]);
function foo(...rest: any[]) {
}

function foo2( { x, y, z }?: { x: string; y: number; z: boolean });
function foo2(...rest: any[]) {

}

//// [declarationEmitDestructuringOptionalBindingParametersInOverloads.js]
function foo() {
}
function foo2() {
}


//// [declarationEmitDestructuringOptionalBindingParametersInOverloads.d.ts]
declare function foo(_0?: [string, number, boolean]): any;
declare function foo2(_0?: {
    x: string;
    y: number;
    z: boolean;
}): any;
