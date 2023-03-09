// @strict: true
// @noEmit: true

interface A {}

type B = A extends Record<'foo', string> ? A['foo'] : string; // no error
