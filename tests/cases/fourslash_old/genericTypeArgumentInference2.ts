/// <reference path='fourslash.ts'/>

////module Underscore {
////    export interface Iterator<T, U> {
////        (value: T, index: any, list: any): U;
////    }
////
////    export interface Static {
////        all<T>(list: T[], iterator?: Iterator<T, boolean>, context?: any): T;
////        identity<T>(value: T): T;
////    }
////}
////
////declare var _: Underscore.Static;
////var r/*1*/ = _./*11*/all([true, 1, null, 'yes'], _.identity);
////var r2/*2*/ = _./*21*/all([true], _.identity);
////var r3/*3*/ = _./*31*/all([], _.identity);
////var r4/*4*/ = _./*41*/all([<any>true], _.identity);

goTo.marker('1');
verify.quickInfoIs('{}');
goTo.marker('11');
verify.quickInfoIs('(list: {}[], iterator?: Underscore.Iterator<{}, boolean>, context?: any): {}');

goTo.marker('2');
verify.quickInfoIs('boolean');
goTo.marker('21');
verify.quickInfoIs('(list: boolean[], iterator?: Underscore.Iterator<boolean, boolean>, context?: any): boolean');

goTo.marker('3');
verify.quickInfoIs('any');
goTo.marker('31');
verify.quickInfoIs('(list: any[], iterator?: Underscore.Iterator<any, boolean>, context?: any): any');

goTo.marker('4');
verify.quickInfoIs('any');
goTo.marker('41');
verify.quickInfoIs('(list: any[], iterator?: Underscore.Iterator<any, boolean>, context?: any): any');

verify.numberOfErrorsInCurrentFile(0);
