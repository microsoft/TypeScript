/// <reference path="fourslash.ts" />

// @Filename: /node_modules/@types/three/index.d.ts
////export class Vector3 {}
////export as namespace THREE;
// @Filename: /global.d.ts
////import * as _THREE from 'three';
////
////declare global {
////  const THREE: typeof _THREE;
////}
// @Filename: /index.ts
////let v = new /*1*/THREE.Vector3();

verify.quickInfoAt("1", `const THREE: typeof import("/node_modules/@types/three/index")`);
