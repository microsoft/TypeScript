/// <reference path='fourslash.ts'/>

////type Map1<K, /*0*/
////type Map1<K, /*1*/V> = [];
////type Map1<K,V> = /*2*/[];
////type Map1<K1, V1> = </*3*/

verify.completions(
    { marker: ["0", "1"], exact: undefined },
    { marker: "2", includes: ["K", "V"], },
    { marker: "3", exact: undefined },
);
