// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/45493

type S = `${number}`;
const b = {
  c: (["4"] as S[]).map(function (s) {
    const a = { ...s, y: 6 };
  }),
};
