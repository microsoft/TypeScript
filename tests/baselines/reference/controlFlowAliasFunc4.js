//// [controlFlowAliasFunc4.ts]
declare interface Foo { 
    readonly a?: { b: { readonly c: {"1":true, "2": true} }};
    readonly boo?: { readonly bop?: {foo:()=>"1"}};
    readonly bar?: { foo:()=>"2"};
    foo:()=>number[];
}
declare const obj:undefined|Foo;
const is1 = obj?.boo?.bop?.foo();
const is2 = obj?.bar?.foo();
const isn = obj?.foo();
if (is1){
    let x = obj.boo.bop.foo();
}
if (is2){
    let x = obj.bar.foo();
}
if (isn){
    let x = obj.foo();
}


//// [controlFlowAliasFunc4.js]
var _a, _b, _c;
var is1 = (_b = (_a = obj === null || obj === void 0 ? void 0 : obj.boo) === null || _a === void 0 ? void 0 : _a.bop) === null || _b === void 0 ? void 0 : _b.foo();
var is2 = (_c = obj === null || obj === void 0 ? void 0 : obj.bar) === null || _c === void 0 ? void 0 : _c.foo();
var isn = obj === null || obj === void 0 ? void 0 : obj.foo();
if (is1) {
    var x = obj.boo.bop.foo();
}
if (is2) {
    var x = obj.bar.foo();
}
if (isn) {
    var x = obj.foo();
}
