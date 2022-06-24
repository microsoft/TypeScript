// @noEmit: true

// repro #49646

type EnvFunction = <T>() => T;

type SimpleType = string | Promise<SimpleType>;

declare const simple: SimpleType;

const env: EnvFunction = () => simple;
