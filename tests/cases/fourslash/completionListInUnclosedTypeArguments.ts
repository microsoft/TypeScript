/// <reference path='fourslash.ts'/>

////let x = 10;
////type Type = void;
////declare function f<T>(): void;
////declare function f2<T, U>(): void;
////f</*1a*/T/*2a*/y/*3a*/
////f</*1b*/T/*2b*/y/*3b*/;
////f</*1c*/T/*2c*/y/*3c*/>
////f</*1d*/T/*2d*/y/*3d*/>
////f</*1e*/T/*2e*/y/*3e*/>();
////
////f2</*1k*/T/*2k*/y/*3k*/,
////f2</*1l*/T/*2l*/y/*3l*/,{| "newId": true |}T{| "newId": true |}y{| "newId": true |}
////f2</*1m*/T/*2m*/y/*3m*/,{| "newId": true |}T{| "newId": true |}y{| "newId": true |};
////f2</*1n*/T/*2n*/y/*3n*/,{| "newId": false |}T{| "newId": false |}y{| "newId": false |}>
////f2</*1o*/T/*2o*/y/*3o*/,{| "newId": false |}T{| "newId": false |}y{| "newId": false |}>
////f2</*1p*/T/*2p*/y/*3p*/,{| "newId": true, "typeOnly": true |}T{| "newId": true, "typeOnly": true |}y{| "newId": true, "typeOnly": true |}>();
////
////f2<typeof /*1uValueOnly*/x, {| "newId": true |}T{| "newId": true |}y{| "newId": true |}
////
////f2</*1x*/T/*2x*/y/*3x*/, () =>/*4x*/T/*5x*/y/*6x*/
////f2<() =>/*1y*/T/*2y*/y/*3y*/, () =>/*4y*/T/*5y*/y/*6y*/
////f2<any, () =>/*1z*/T/*2z*/y/*3z*/

goTo.eachMarker(marker => {
    const markerName = test.markerName(marker) || "";
    const valueOnly = markerName.endsWith("ValueOnly");
    verify.completions({
        marker,
        includes: valueOnly ? "x" : "Type",
        excludes: valueOnly ? "Type" : "x",
        isNewIdentifierLocation: marker.data && marker.data.newId || false,
    });
});
