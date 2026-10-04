// @noEmit: true

// https://github.com/microsoft/TypeScript/tsc/issues/3805

const f = () => 42 satisfies typeof f;
