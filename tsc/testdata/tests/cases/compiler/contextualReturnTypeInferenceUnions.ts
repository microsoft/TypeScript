// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/64690

type Ok<T> = { ok: true; value: T };
type Err<E> = { ok: false; value: E };
declare function ok<const T>(value: T): Ok<T>;

export function f(): Ok<string[]> | Err<string> {
  return ok([]);
}
