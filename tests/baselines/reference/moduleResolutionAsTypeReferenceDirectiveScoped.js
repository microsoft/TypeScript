//// [tests/cases/compiler/moduleResolutionAsTypeReferenceDirectiveScoped.ts] ////

//// [index.d.ts]
export const dummy: number;

//// [index.d.ts]
export const typesCache: number;

//// [index.d.ts]
export const mangledTypes: number;

//// [index.d.ts]
export const nodeModulesCache: number;

//// [index.d.ts]
export const mangledNodeModules: number;

//// [index.d.ts]
export const atTypesCache: number;

//// [index.d.ts]
export const mangledAtTypesCache: number;


//// [a.ts]
import { typesCache } from "@scoped/typescache";
import { mangledTypes } from "@mangled/typescache";
import { nodeModulesCache } from "@scoped/nodemodulescache";
import { mangledNodeModules } from "@mangled/nodemodulescache";
import { atTypesCache } from "@scoped/attypescache";
import { mangledAtTypesCache } from "@mangled/attypescache";


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
