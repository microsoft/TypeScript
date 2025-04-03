// @strict: true
// @exactOptionalPropertyTypes: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/60233

type T = {
  foo?: true;
  bar?: true;
};

type WrappedT<t extends T> = [t];

type OmitBarFromWrapped<t> = t extends WrappedT<infer inner>
  ? WrappedT<Omit<inner, "bar">>
  : never;

type OmitHomomorphicFromWrapped<t> = t extends WrappedT<infer inner>
  ? WrappedT<HomomorphicOmit<inner, "bar">>
  : never;

type HomomorphicOmit<t, keyToOmit> = {
  [k in keyof t as k extends keyToOmit ? never : k]: t[k];
};

type OmitHomomorphicFromWrappedConformed<t> = t extends WrappedT<infer inner>
  ? WrappedT<conform<HomomorphicOmit<inner, "bar">, T>>
  : never;

type conform<t, base> = t extends base ? t : base;
