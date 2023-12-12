///<reference path="fourslash.ts"/>
// @strict: true
////
//// interface Events {
////   click: any;
////   drag: any;
//// }
////
//// declare function addListener<K extends keyof Events>(type: K, listener: (ev: Events[K]) => any): void;
////
//// /*1*/addListener/*2*/("/*3*/")

verify.completions({ marker: ["3"], exact: ["click", "drag"] });
verify.errorExistsBetweenMarkers("1", "2");
