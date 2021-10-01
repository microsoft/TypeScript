// @strict: true

// Repro from #42786

function isDefined<T>(value: T | undefined | null | void): value is T {
  return value !== undefined && value !== null;
}

declare const foo: string | undefined;

if (isDefined(foo)) {
  console.log(foo.toUpperCase()); 
}
