/// <reference path="fourslash.ts" />

//// interface Events {
////   drag: any;
////   dragenter: any;
//// }
//// declare function addListener<K extends keyof Events>(type: K, listener: (ev: Events[K]) => any): void;
//// declare function addListener(type: string, listener: (ev: any) => any): void;
////
//// addListener("/**/");

verify.completions({ marker: "", isNewIdentifierLocation: true, exact: ["drag", "dragenter"] });
edit.insert("drag");
verify.completions({ isNewIdentifierLocation: true, exact: ["drag", "dragenter"] });