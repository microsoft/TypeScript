// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/55667

type _1 = ReturnType<(...args: never) => 'foo'>
type _2 = InstanceType<new (...args: never) => 'foo'>