/// <reference path='fourslash.ts' />

// @Filename: /node_modules/@types/three/three-core.d.ts
////export class Vector3 {
////    constructor(x?: number, y?: number, z?: number);
////    x: number;
////    y: number;
////}

// @Filename: /node_modules/@types/three/index.d.ts
////export * from "./three-core";
////export as namespace [|{| "isWriteAccess": true, "isDefinition": true |}THREE|];

// @Filename: /typings/global.d.ts
////import * as _THREE from '[|three|]';
////declare global {
////    const [|{| "isWriteAccess": true, "isDefinition": true |}THREE|]: typeof _THREE;
////}

// @Filename: /src/index.ts
////export const a = {};
////let v = new [|THREE|].Vector2();

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

// GH#29533
// TODO:: this should be var THREE: typeof import instead of module name as var but thats existing issue and repros with quickInfo too.
verify.singleReferenceGroup(`module "/node_modules/@types/three/index"
var "/node_modules/@types/three/index": typeof import("/node_modules/@types/three/index")`);