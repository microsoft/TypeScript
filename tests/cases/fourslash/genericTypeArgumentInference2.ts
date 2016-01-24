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
////var /*1*/r = _./*11*/all([true, 1, null, 'yes'], _.identity);
////var /*2*/r2 = _./*21*/all([true], _.identity);
////var /*3*/r3 = _./*31*/all([], _.identity);
////var /*4*/r4 = _./*41*/all([<any>true], _.identity);

goTo.marker('1');
verify.quickInfoIs('var r: boolean | number | string');
goTo.marker('11');
verify.quickInfoIs('(method) Underscore.Static.all<boolean | number | string>(list: (boolean | number | string)[], iterator?: Underscore.Iterator<boolean | number | string, boolean>, context?: any): boolean | number | string');

goTo.marker('2');
verify.quickInfoIs('var r2: boolean');
goTo.marker('21');
verify.quickInfoIs('(method) Underscore.Static.all<boolean>(list: boolean[], iterator?: Underscore.Iterator<boolean, boolean>, context?: any): boolean');

goTo.marker('3');
verify.quickInfoIs('var r3: any');
goTo.marker('31');
verify.quickInfoIs('(method) Underscore.Static.all<any>(list: any[], iterator?: Underscore.Iterator<any, boolean>, context?: any): any');

goTo.marker('4');
verify.quickInfoIs('var r4: any');
goTo.marker('41');
verify.quickInfoIs('(method) Underscore.Static.all<any>(list: any[], iterator?: Underscore.Iterator<any, boolean>, context?: any): any');

verify.numberOfErrorsInCurrentFile(0);
