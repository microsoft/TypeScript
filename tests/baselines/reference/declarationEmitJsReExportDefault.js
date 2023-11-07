//// [tests/cases/compiler/declarationEmitJsReExportDefault.ts] ////

//// [package.json]
{"name": "a", "version": "0.0.0"}
//// [index.d.ts]
export const a = 123;

//// [index.mjs]
export {default as mod} from 'a';




//// [index.d.mts]
export { "/node_modules/a/index" as mod } from "a";


//// [DtsFileErrors]


/index.d.mts(1,10): error TS1003: Identifier expected.
/index.d.mts(1,34): error TS1005: ';' expected.
/index.d.mts(1,34): error TS2304: Cannot find name 'as'.
/index.d.mts(1,37): error TS2304: Cannot find name 'mod'.
/index.d.mts(1,41): error TS1128: Declaration or statement expected.
/index.d.mts(1,43): error TS1434: Unexpected keyword or identifier.
/index.d.mts(1,43): error TS2304: Cannot find name 'from'.


==== /tsconfig.json (0 errors) ====
    {
      "compilerOptions": {
        "module": "node16",
        "declaration": true,
        "emitDeclarationOnly": true,
        "checkJs": true,
      }
    }
==== /index.d.mts (7 errors) ====
    export { "/node_modules/a/index" as mod } from "a";
             ~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS1003: Identifier expected.
                                     ~~
!!! error TS1005: ';' expected.
                                     ~~
!!! error TS2304: Cannot find name 'as'.
                                        ~~~
!!! error TS2304: Cannot find name 'mod'.
                                            ~
!!! error TS1128: Declaration or statement expected.
                                              ~~~~
!!! error TS1434: Unexpected keyword or identifier.
                                              ~~~~
!!! error TS2304: Cannot find name 'from'.
    
==== /node_modules/a/package.json (0 errors) ====
    {"name": "a", "version": "0.0.0"}
==== /node_modules/a/index.d.ts (0 errors) ====
    export const a = 123;
    