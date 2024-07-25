/// <reference path="../fourslash.ts"/>

// @Filename: /a/index.ts
////import { NS } from "../b";
////import { I } from "../c";
////
////declare module "../b" {
////    export namespace NS {
////        export function /*1*/FA();
////    }
////}
////
////declare module "../c" {
////    export interface /*2*/I {
////        /*3*/FA();
////    }
////}
////
////const ia: I = {
////    FA: NS.FA,
////    FC() { },
////};

// @Filename: /a/tsconfig.json
////{
////    "extends": "../tsconfig.settings.json",
////    "references": [
////        { "path": "../b" },
////        { "path": "../c" },
////    ],
////    "files": [
////        "index.ts",
////    ],
////}

// @Filename: /a2/index.ts
////import { NS } from "../b";
////import { I } from "../c";
////
////declare module "../b" {
////    export namespace NS {
////        export function /*4*/FA();
////    }
////}
////
////declare module "../c" {
////    export interface /*5*/I {
////        /*6*/FA();
////    }
////}
////
////const ia: I = {
////    FA: NS.FA,
////    FC() { },
////};

// @Filename: /a2/tsconfig.json
////{
////    "extends": "../tsconfig.settings.json",
////    "references": [
////        { "path": "../b" },
////        { "path": "../c" },
////    ],
////    "files": [
////        "index.ts",
////    ],
////}

// @Filename: /b/index.ts
////export namespace NS {
////    export function /*7*/FB() {}
////}
////
////export interface /*8*/I {
////    /*9*/FB();
////}
////
////const ib: I = { FB() {} };

// @Filename: /b/other.ts
////export const Other = 1;

// @Filename: /b/tsconfig.json
////{
////    "extends": "../tsconfig.settings.json",
////    "files": [
////        "index.ts",
////        "other.ts",
////    ],
////}

// @Filename: /c/index.ts
////export namespace NS {
////    export function /*10*/FC() {}
////}
////
////export interface /*11*/I {
////    /*12*/FC();
////}
////
////const ic: I = { FC() {} };

// @Filename: /c/tsconfig.json
////{
////    "extends": "../tsconfig.settings.json",
////    "files": [
////        "index.ts",
////    ],
////}

// @Filename: /tsconfig.json
////{
////    "compilerOptions": {
////        "composite": true,
////    },
////    "references": [
////        { "path": "a" },
////        { "path": "a2" },
////    ],
////    "files": []
////}

// @Filename: /tsconfig.settings.json
////{
////    "compilerOptions": {
////        "composite": true,
////        "skipLibCheck": true,
////        "declarationMap": true,
////        "module": "CommonJS",
////        "emitDeclarationOnly": true,
////    }
////}

verify.baselineFindAllReferences('1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12');
