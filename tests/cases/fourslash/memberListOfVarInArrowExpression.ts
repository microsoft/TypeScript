/// <reference path='fourslash.ts' />

////interface IMap<T> {
////    [key: string]: T;
////}
////var map: IMap<{ a1: string; }[]>;
////var categories: string[];
////each(categories, category => {
////    var changes = map[category];
////    changes[0]./*1*/a1;
////    return each(changes, change => {
////    });
////});
////function each<T>(items: T[], handler: (item: T) => void) { }

goTo.marker('1');
verify.quickInfoIs("(property) a1: string");
verify.completionListContains("a1", "(property) a1: string");