//// [tests/cases/compiler/declarationEmitOptionalMappedTypePropertyNoStrictNullChecks3.ts] ////

//// [createApi.ts]
type Id<T> = {
  [K in keyof T]: T[K];
} & {};

export declare function createApi<Definitions>(_: { endpoints: Definitions }): {
  [K in keyof Definitions as `use${Capitalize<K & string>}Query`]: () => Id<{
    status: "uninitialized";
    originalArgs?: never;
  }>;
};

//// [index.ts]
import { createApi } from "./createApi";

const slice = createApi({
  endpoints: {
    test: {
      url: `/user`,
    },
  },
});

export const { useTestQuery } = slice;




//// [createApi.d.ts]
type Id<T> = {
    [K in keyof T]: T[K];
} & {};
export declare function createApi<Definitions>(_: {
    endpoints: Definitions;
}): {
    [K in keyof Definitions as `use${Capitalize<K & string>}Query`]: () => Id<{
        status: "uninitialized";
        originalArgs?: never;
    }>;
};
export {};
//// [index.d.ts]
export declare const useTestQuery: () => {
    status: "uninitialized";
    originalArgs?: never;
};
