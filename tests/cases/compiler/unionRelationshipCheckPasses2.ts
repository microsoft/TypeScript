// @strict: true
// @noEmit: true
// @exactOptionalPropertyTypes: true, false

// https://github.com/microsoft/TypeScript/issues/61678

export type U = { type: "A"; value: null } | { type: "B"; value: string };

function call<T>(f: () => T): T {
  return f();
}

export function functionCall(): U {
  return call(() => {  // error
    if (Math.random()) {
      return { type: "A" };
    }

    return { type: "B", value: "test" };
  });
}

export function directReturn(): U {
  if (Math.random()) {
    return { type: "A" }; // error
  }

  return { type: "B", value: "test" };
}
