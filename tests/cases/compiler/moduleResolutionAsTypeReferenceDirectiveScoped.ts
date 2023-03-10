// @noImplicitReferences: true
// @typeRoots: /a/types,/a/node_modules,/a/node_modules/@types
// @types: dummy
// @traceResolution: true
// @currentDirectory: /

// @Filename: /a/types/dummy/index.d.ts
export const dummy: number;

// @Filename: /a/types/@scoped/typescache/index.d.ts
export const typesCache: number;

// @Filename: /a/types/mangled__typescache/index.d.ts
export const mangledTypes: number;

// @Filename: /a/node_modules/@scoped/nodemodulescache/index.d.ts
export const nodeModulesCache: number;

// @Filename: /a/node_modules/mangled__nodemodulescache/index.d.ts
export const mangledNodeModules: number;

// @Filename: /a/node_modules/@types/@scoped/attypescache/index.d.ts
export const atTypesCache: number;

// @Filename: /a/node_modules/@types/mangled__attypescache/index.d.ts
export const mangledAtTypesCache: number;


// @Filename: /a.ts
import { typesCache } from "@scoped/typescache";
import { mangledTypes } from "@mangled/typescache";
import { nodeModulesCache } from "@scoped/nodemodulescache";
import { mangledNodeModules } from "@mangled/nodemodulescache";
import { atTypesCache } from "@scoped/attypescache";
import { mangledAtTypesCache } from "@mangled/attypescache";
