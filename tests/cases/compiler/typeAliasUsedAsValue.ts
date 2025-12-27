// @filename: mytypes.ts
export class MyClass {
    public a: number;
}

export type MyClassAlias = MyClass;

// @filename: main.ts
import {MyClassAlias} from './mytypes';

let a: MyClassAlias = new MyClassAlias(); // Error: should show better message
let b = MyClassAlias; // Error: should show better message

// Test with local type alias
type LocalAlias = string;
let c = LocalAlias; // Error: should show better message

// Test with interface
interface MyInterface {
    prop: string;
}
let d = MyInterface; // Error: should show better message

// Test with generic type alias
type GenericAlias<T> = T[];
let e = GenericAlias; // Error: should show better message
