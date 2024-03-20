// @strict: true
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/56786

function checkAll<T>(something: T): T {
  switch (typeof something) {
    case "number":
    case "bigint":
    case "boolean":
    case "symbol":
    case "undefined":
    case "function":
    case "object":
    case "string":
      return something;
  }
}
