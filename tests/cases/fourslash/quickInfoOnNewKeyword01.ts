/// <reference path='fourslash.ts' />

////class Cat {
////  /**
////   * NOTE: this constructor is private! Please use the factory function
////   */
////  private constructor() { }
////
////  static makeCat() { new Cat(); }
////}
////
////ne/*1*/w Ca/*2*/t();

verify.quickInfoAt('1', 'constructor Cat(): Cat',
'NOTE: this constructor is private! Please use the factory function');

verify.quickInfoAt('2', 'constructor Cat(): Cat',
'NOTE: this constructor is private! Please use the factory function');
