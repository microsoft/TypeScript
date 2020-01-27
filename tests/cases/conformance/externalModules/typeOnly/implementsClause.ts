// @Filename: types.ts
export interface Component {}

// @Filename: ns.ts
import type * as types from './types';
export { types };

// @Filename: index.ts
import type * as types from './types';
import * as nestedNamespace from './ns';

class C implements types.Component {}
class D implements nestedNamespace.types.Component {}
