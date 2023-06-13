//// [tests/cases/compiler/recursiveConditionalCrash2.ts] ////

//// [recursiveConditionalCrash2.ts]
// Simplified #43529

export type CanBeExpanded<T extends object> = {
  value: T
}

type Expand__<O, N, Depth> =
  N extends Depth ?
      unknown :
      O extends CanBeExpanded<any> ?
          Expand__<O['value'], N, Depth> :
          O

export type UseQueryOptions<T> = Expand__<T, 4, 2>


//// [recursiveConditionalCrash2.js]
"use strict";
// Simplified #43529
Object.defineProperty(exports, "__esModule", { value: true });
