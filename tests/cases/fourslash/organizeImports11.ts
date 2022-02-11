/// <reference path="fourslash.ts" />

////import { TypeA, TypeB, TypeC, UnreferencedType } from 'my-types';
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

verify.organizeImports(`import { TypeA, TypeB, TypeC } from 'my-types';

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