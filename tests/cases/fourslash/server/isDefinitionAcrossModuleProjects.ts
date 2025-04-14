/// <reference path="../fourslash.ts"/>

// @Filename: /home/src/workspaces/project/a/index.ts
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

// @Filename: /home/src/workspaces/project/a/tsconfig.json
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

// @Filename: /home/src/workspaces/project/a2/index.ts
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

// @Filename: /home/src/workspaces/project/a2/tsconfig.json
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

// @Filename: /home/src/workspaces/project/b/index.ts
////export namespace NS {
////    export function /*7*/FB() {}
////}
////
////export interface /*8*/I {
////    /*9*/FB();
////}
////
////const ib: I = { FB() {} };

// @Filename: /home/src/workspaces/project/b/other.ts
////export const Other = 1;

// @Filename: /home/src/workspaces/project/b/tsconfig.json
////{
////    "extends": "../tsconfig.settings.json",
////    "files": [
////        "index.ts",
////        "other.ts",
////    ],
////}

// @Filename: /home/src/workspaces/project/c/index.ts
////export namespace NS {
////    export function /*10*/FC() {}
////}
////
////export interface /*11*/I {
////    /*12*/FC();
////}
////
////const ic: I = { FC() {} };

// @Filename: /home/src/workspaces/project/c/tsconfig.json
////{
////    "extends": "../tsconfig.settings.json",
////    "files": [
////        "index.ts",
////    ],
////}

// @Filename: /home/src/workspaces/project/tsconfig.json
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

// @Filename: /home/src/workspaces/project/tsconfig.settings.json
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
