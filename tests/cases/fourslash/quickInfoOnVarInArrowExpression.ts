/// <reference path='fourslash.ts' />

////interface IMap<T> {
////    [key: string]: T;
////}
////var map: IMap<string[]>;
////var categories: string[];
////each(categories, category => {
////    var /*1*/changes = map[category];
////    return each(changes, change => {
////    });
////});
////function each<T>(items: T[], handler: (item: T) => void) { }

goTo.marker('1');
verify.quickInfoIs("(local var) changes: string[]", undefined);