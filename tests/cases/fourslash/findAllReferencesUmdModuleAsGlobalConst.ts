/// <reference path='fourslash.ts' />

// @Filename: /node_modules/@types/three/three-core.d.ts
////export class Vector3 {
////    constructor(x?: number, y?: number, z?: number);
////    x: number;
////    y: number;
////}

// @Filename: /node_modules/@types/three/index.d.ts
////export * from "./three-core";
////[|export as namespace [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}THREE|];|]

// @Filename: /typings/global.d.ts
////[|import * as _THREE from '[|{| "contextRangeIndex": 2 |}three|]';|]
////declare global {
////    [|const [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}THREE|]: typeof _THREE;|]
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

const [r0Def, r0, r1Def, r1, r2Def, ...rest] = test.ranges();
verify.singleReferenceGroup(`module THREE
var THREE: typeof import("/node_modules/@types/three/index")`, [r0, r1, ...rest]);