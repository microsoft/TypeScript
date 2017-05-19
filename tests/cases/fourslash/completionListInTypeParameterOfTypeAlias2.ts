/// <reference path='fourslash.ts'/>

////type Map1<K, /*0*/
////type Map1<K, /*1*/V> = [];
////type Map1<K,V> = /*2*/[];
////type Map1<K1, V1> = </*3*/

goTo.marker("0");
verify.completionListIsEmpty();
goTo.marker("1");
verify.completionListContains("V");
goTo.marker("2");
verify.completionListContains("K");
verify.completionListContains("V");
goTo.marker("3");
verify.not.completionListContains("K");
verify.not.completionListContains("V");
verify.completionListContains("K1");
verify.completionListContains("V1");