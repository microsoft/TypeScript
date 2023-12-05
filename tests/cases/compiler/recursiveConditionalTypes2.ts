// @strict: true
// @lib: esnext
// @noEmit: true

// repro from https://github.com/microsoft/TypeScript/issues/43877

type UnionToIntersection<U> = (
  U extends any ? (k: U) => unknown : never
) extends (k: infer I) => unknown
  ? I
  : never;

interface ClassSpec {
  public?: object;
  private?: object;
  publicExtends?: Record<string, ClassSpec>;
  privateExtends?: Record<string, ClassSpec>;
}

type MaybeMergePrivateSuperSpec<T> = T extends Record<string, ClassSpec>
  ? MergePrivateSuperSpec<T>
  : {};

type MaybeMergePrivateSpecs<T extends ClassSpec, U> = U extends ClassSpec
  ? MergePrivateSpecs<U, T>
  : T;

type MergePrivateSpecs<T extends ClassSpec, U extends ClassSpec> = {
  public: T["public"] & U["public"];
  private: T["private"] & U["private"];
};

type MergePrivateSuperSpec<T extends Record<string, ClassSpec>> =
  UnionToIntersection<
    {
      [P in keyof T]: SimplifyPrivateSpec<T[P]>;
    }[keyof T]
  >;

export type SimplifyPrivateSpec<T extends ClassSpec> = MaybeMergePrivateSpecs<
  MaybeMergePrivateSpecs<T, MaybeMergePrivateSuperSpec<T["publicExtends"]>>,
  MaybeMergePrivateSuperSpec<T["privateExtends"]>
>;

// repro from https://github.com/microsoft/TypeScript/issues/43877#issuecomment-866146516

type Converted<T> = {
  [P in keyof T]: null extends T[P] ? T[P] : T[P];
};

type DefaultsDeep<T, U extends T> = {
  [P in keyof T]-?: U[P] extends T[P]
    ? null extends U[P]
      ? Converted<DefaultsDeep<T[P], NonNullable<U[P]>>>
      : T[P]
    : T[P];
};

interface _Array<T> {
  find<S extends T>(predicate: (value: T) => boolean): void;
}

const z: _Array<DefaultsDeep<{}, {}>> = [];

z.find((_) => true);
