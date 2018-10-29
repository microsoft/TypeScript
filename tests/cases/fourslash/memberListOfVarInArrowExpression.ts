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

verify.quickInfoAt("1", "(property) a1: string");
verify.completions({ marker: "1", exact: { name: "a1", text: "(property) a1: string" } });
