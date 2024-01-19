// @strict: true
// @exactOptionalPropertyTypes: true, false
// @lib: esnext
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/55532#issuecomment-1694744665

type Maybe<T> = null | undefined | T;

declare class GraphQLError extends Error {
  originalError: Error;
}

interface ExecutionArgs {
  variableValues?: Maybe<{ readonly [variable: string]: unknown }>;
}

interface ExecutionContext {
  variableValues: { [variable: string]: unknown };
}

type CoercedVariableValues =
  | { errors: ReadonlyArray<GraphQLError>; coerced?: never }
  | { coerced: { [variable: string]: unknown }; errors?: never };

declare function getVariableValues(inputs: {
  readonly [variable: string]: unknown;
}): CoercedVariableValues;

export function buildExecutionContext(
  args: ExecutionArgs,
): ReadonlyArray<GraphQLError> | ExecutionContext {
  const { variableValues: rawVariableValues } = args;

  const coercedVariableValues = getVariableValues(rawVariableValues ?? {});

  if (coercedVariableValues.errors) {
    return coercedVariableValues.errors;
  }

  return {
    variableValues: coercedVariableValues.coerced,
  };
}
