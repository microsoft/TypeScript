/// <reference path="../fourslash.ts" />
// @Filename: BaseClass/Source.d.ts
////declare class Control {
////    constructor();
////    /** this is a super var */
////    myVar: boolean | 'yeah';
////}
//////# sourceMappingURL=Source.d.ts.map
// @Filename: BaseClass/Source.d.ts.map
////{"version":3,"file":"Source.d.ts","sourceRoot":"","sources":["Source.ts"],"names":[],"mappings":"AAAA,cAAM,OAAO;;IAIT,0BAA0B;IACnB,KAAK,EAAE,OAAO,GAAG,MAAM,CAAQ;CACzC"}
// @Filename: BaseClass/Source.ts
////class /*2*/Control{
////    constructor(){
////        return;
////    }
////    /** this is a super var */
////    public /*4*/myVar: boolean | 'yeah' = true;
////}
// @Filename: tsbase.json
////{
////    "$schema": "http://json.schemastore.org/tsconfig",
////    "compileOnSave": true,
////    "compilerOptions": {
////      "sourceMap": true,
////      "declaration": true,
////      "declarationMap": true
////    }
////  }
// @Filename: buttonClass/tsconfig.json
////{
////    "extends": "../tsbase.json",
////    "compilerOptions": {
////      "outFile": "Source.js"
////    },
////    "files": [
////      "Source.ts"
////    ],
////    "include": [
////      "../BaseClass/Source.d.ts"
////    ]
////  }
// @Filename: buttonClass/Source.ts
////// I cannot F12 navigate to Control
//////                   vvvvvvv
////class Button extends [|/*1*/Control|] {
////    public myFunction() {
////        // I cannot F12 navigate to myVar
////        //              vvvvv
////        if (typeof this.[|/*3*/myVar|] === 'boolean') {
////            this.myVar;
////        } else {
////            this.myVar.toLocaleUpperCase();
////        }
////    }
////}

verify.baselineGoToDefinition("1", "3");
