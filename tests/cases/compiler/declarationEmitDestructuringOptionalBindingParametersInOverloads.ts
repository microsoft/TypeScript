// @declaration: true

function foo([x, y, z] ?: [string, number, boolean]);
function foo(...rest: any[]) {
}

function foo2( { x, y, z }?: { x: string; y: number; z: boolean });
function foo2(...rest: any[]) {

}