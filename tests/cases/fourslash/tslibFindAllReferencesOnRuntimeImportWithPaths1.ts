/// <reference path="fourslash.ts" />

// @Filename: project/src/foo.ts
////import * as x from /**/"tslib";
// @Filename: project/src/bar.ts
////export default "";
// @Filename: project/src/bal.ts
////
// @Filename: project/src/dir/tslib.d.ts
////export function __importDefault(...args: any): any;
////export function __importStar(...args: any): any;
// @Filename: project/tsconfig.json
////{
////    "compilerOptions": {
////        "moduleResolution": "node",
////        "module": "es2020",
////        "importHelpers": true,
////        "moduleDetection": "force",
////        "paths": {
////            "tslib": ["./src/dir/tslib"]
////        }
////    }
////}

verify.baselineFindAllReferences("");
