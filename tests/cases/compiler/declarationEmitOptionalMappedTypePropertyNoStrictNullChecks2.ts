// @strictNullChecks: false
// @declaration: true
// @emitDeclarationOnly: true

// @filename: createApi.ts

type Id<T> = {
  [K in keyof T]: T[K];
} & {};

export declare function createApi<Definitions>(_: { endpoints: Definitions }): {
  [K in keyof Definitions as `use${Capitalize<K & string>}Query`]: () => Id<{
    status: "uninitialized";
    originalArgs?: any[];
  }>;
};

// @filename: index.ts

import { createApi } from "./createApi";

const slice = createApi({
  endpoints: {
    test: {
      url: `/user`,
    },
  },
});

export const { useTestQuery } = slice;
