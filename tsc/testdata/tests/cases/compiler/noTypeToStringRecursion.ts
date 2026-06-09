// @noEmit: true

// https://github.com/microsoft/typescript-go/issues/3805

const f = () => 42 satisfies typeof f;
