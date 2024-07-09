/// <reference path='fourslash.ts' />

////interface IFoo {
////  /** this is the name of blabla 
////   *  - use blabla 
////   *  @example blabla
////   */
////  name?: string;
////}
////
////// test1 should work
////class Foo implements IFoo {
////  //public name: string = '';
////  constructor(
////    public na/*1*/me: string, // documentation should leech and work ! 
////  ) {
////  }
////}
////
////// test2 work
////class Foo2 implements IFoo {
////  public na/*2*/me: string = ''; // documentation leeched and work ! 
////  constructor(
////    //public name: string,
////  ) {
////  }
////}

verify.baselineQuickInfo()
