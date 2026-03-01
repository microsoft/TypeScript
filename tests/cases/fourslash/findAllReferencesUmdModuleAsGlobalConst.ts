/// <reference path='fourslash.ts' />

// @Filename: /node_modules/@types/three/three-core.d.ts
////export class Vector3 {
////    constructor(x?: number, y?: number, z?: number);
////    x: number;
////    y: number;
////}

// @Filename: /node_modules/@types/three/index.d.ts
////export * from "./three-core";
////export as namespace /*0*/THREE;

// @Filename: /typings/global.d.ts
////import * as _THREE from '/*1*/three';
////declare global {
////    const /*2*/THREE: typeof _THREE;
////}

// @Filename: /src/index.ts
////export const a = {};
////let v = new /*3*/THREE.Vector2();

// @Filename: /tsconfig.json
////{
////    "compilerOptions": {
////        "esModuleInterop": true,
////        "outDir": "./build/js/",
////        "noImplicitAny": true,
////        "module": "es6",
////        "target": "es6",
////        "allowJs": true,
////        "skipLibCheck": true,
////        "lib": ["es2016", "dom"],
////        "typeRoots": ["node_modules/@types/"],
////        "types": ["three"]
//// 	},
////    "files": ["/src/index.ts", "typings/global.d.ts"]
////}

verify.baselineFindAllReferences('0', '1', '2', '3');
