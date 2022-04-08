/// <reference path="fourslash.ts" />

// @Filename: /test.ts
////import { TypeA, TypeB, TypeC, UnreferencedType } from './my-types';
////
/////**
//// * MyClass {@link TypeA}
//// */
////export class MyClass {
////
////  /**
////   * Some Property {@link TypeB}
////   */
////  public something;
////
////  /**
////   * Some function {@link TypeC}
////   */
////  public myMethod() {
////
////    /**
////     * Some lambda function {@link TypeC}
////     */
////    const someFunction = () => {
////      return '';
////    }
////    someFunction();
////  }
////}

// @Filename: /my-types.ts
//// export type TypeA = string;
//// export class TypeB { }
//// export type TypeC = () => string;

verify.organizeImports(`import { TypeA, TypeB, TypeC } from './my-types';

/**
 * MyClass {@link TypeA}
 */
export class MyClass {

  /**
   * Some Property {@link TypeB}
   */
  public something;

  /**
   * Some function {@link TypeC}
   */
  public myMethod() {

    /**
     * Some lambda function {@link TypeC}
     */
    const someFunction = () => {
      return '';
    }
    someFunction();
  }
}`
);