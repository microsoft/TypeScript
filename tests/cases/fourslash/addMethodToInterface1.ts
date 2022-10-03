/// <reference path="fourslash.ts" />

//// interface Comparable<T> {
//// /*1*/}
//// interface Comparer {
//// }
//// var max2: Comparer = (x, y) => { return (x.compareTo(y) > 0) ? x : y };
//// var maxResult = max2(1);

edit.disableFormatting();

goTo.marker('1');

edit.insert("    compareTo(): number;\n");
