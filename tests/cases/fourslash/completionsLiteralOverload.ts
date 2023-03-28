/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /a.tsx
//// interface Events {
////   "": any;
////   drag: any;
////   dragenter: any;
//// }
//// declare function addListener<K extends keyof Events>(type: K, listener: (ev: Events[K]) => any): void;
////
//// declare function ListenerComponent<K extends keyof Events>(props: { type: K, onWhatever: (ev: Events[K]) => void }): JSX.Element;
////
//// addListener("/*ts*/");
//// (<ListenerComponent type="/*tsx*/" />);

// @Filename: /b.js
//// addListener("/*js*/");

verify.completions({ marker: ["ts", "tsx", "js"], exact: ["", "drag", "dragenter"] });
edit.insert("drag");
verify.completions({ marker: ["ts", "tsx", "js"], exact: ["", "drag", "dragenter"] });