// @declaration: true
// @target: es2015
// @module: es2015, esnext

// @filename: 0.ts
export interface I { }

// @filename: 1.ts
export type {} from './0' with { type: "json" }
export type { I } from './0' with { type: "json" }

// @filename: 2.ts
import type { I } from './0'  with { type: "json" }
import type * as foo from './0' with { type: "json" }
