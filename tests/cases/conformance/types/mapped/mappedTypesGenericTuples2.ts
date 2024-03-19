// @strict: true
// @lib: esnext
// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/57389

declare function getT<T>(): T;

Promise.all([getT<string>(), ...getT<any>()]).then((result) => {
  const head = result[0]; // string
  const tail = result.slice(1); // any[]
  tail satisfies string[]; // ok
});
