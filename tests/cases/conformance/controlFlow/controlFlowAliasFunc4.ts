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
