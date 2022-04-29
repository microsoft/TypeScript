module Test {
    export interface MyFunc {
        <T>(value1: T): T;
    }
    export class MyClass {
        constructor(func: MyFunc) { }
    }
 
 export function F(func: MyFunc) { }
}
var func: Test.MyFunc;
Test.F(func); // OK
var test = new Test.MyClass(func); // Should be OK
