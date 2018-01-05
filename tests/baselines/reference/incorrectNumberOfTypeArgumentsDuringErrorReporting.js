//// [incorrectNumberOfTypeArgumentsDuringErrorReporting.ts]
interface ObjA {
  y?:string,
}

interface ObjB {[key:string]:any}

interface Opts<A, B> {a:A, b:B}

const fn = <
  A extends ObjA,
  B extends ObjB = ObjB
>(opts:Opts<A, B>):string => 'Z'

interface MyObjA {
  x:string,
}

fn<MyObjA>({
  a: {x: 'X', y: 'Y'},
  b: {},
})


//// [incorrectNumberOfTypeArgumentsDuringErrorReporting.js]
var fn = function (opts) { return 'Z'; };
fn({
    a: { x: 'X', y: 'Y' },
    b: {}
});
