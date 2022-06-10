// @strict: true 
// @declaration: true

declare type Foo = { foo: ()=> number[] }; 
declare const obj: undefined | Foo;
const isFoo = obj?.foo();
if (isFoo){
    obj.foo();
}