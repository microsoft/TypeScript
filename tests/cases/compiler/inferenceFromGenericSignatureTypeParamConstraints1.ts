// @noEmit: true
// @strict: true

// https://github.com/microsoft/TypeScript/issues/41040

type InferGenericConstraint<Fn> = 
    Fn extends <T extends infer Constraint>(arg: T) => any
        ? Constraint
        : never;

type GenericFunctionExample = <T extends number>(arg: T) => void;

type InferredConstraint = InferGenericConstraint<GenericFunctionExample>;
