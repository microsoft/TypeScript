/// <reference path='fourslash.ts'/>
// #32708

////interface I<T> {
////    /** only once please */
////    t: T
////}
////interface C<T> extends I<T> {
////    t: T
////}
////declare var cnsb: C<number> & C<string> & C<boolean>;
////cnsb.t/**/

verify.quickInfoAt("", "(property) C<T>.t: never", "only once please");
