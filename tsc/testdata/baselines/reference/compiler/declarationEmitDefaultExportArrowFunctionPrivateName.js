//// [tests/cases/compiler/declarationEmitDefaultExportArrowFunctionPrivateName.ts] ////

//// [helper.ts]
declare const brand: unique symbol;

class Foo {
  [brand]: number = 1;
}

export function makeFoo() {
  return new Foo();
}

//// [repro.ts]
import { makeFoo } from './helper';

export default () => makeFoo();




//// [helper.d.ts]
declare const brand: unique symbol;
declare class Foo {
    [brand]: number;
}
export declare function makeFoo(): Foo;
export {};
