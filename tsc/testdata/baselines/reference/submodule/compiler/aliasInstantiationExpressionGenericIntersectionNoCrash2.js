//// [tests/cases/compiler/aliasInstantiationExpressionGenericIntersectionNoCrash2.ts] ////

//// [aliasInstantiationExpressionGenericIntersectionNoCrash2.ts]
declare class Class<T> {
  x: T;
}

declare function fn<T>(): T;


type ClassAlias<T> = typeof Class<T>;
type FnAlias<T> = typeof fn<T>;

type Wat<T> = ClassAlias<T> & FnAlias<T>;


declare const wat: Wat<number>;
wat as Wat<string>;


//// [aliasInstantiationExpressionGenericIntersectionNoCrash2.js]
"use strict";
wat;
