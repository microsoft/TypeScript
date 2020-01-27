// @Filename: types.ts
export interface Component {}

// @Filename: index.ts
import type * as types from './types';
class C implements types.Component {}