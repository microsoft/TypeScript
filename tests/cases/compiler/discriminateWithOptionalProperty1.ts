// @strict: true
// @exactOptionalPropertyTypes: true, false
// @noEmit: true

type Box<T> = { done?: false } | { done: true; value: T };

declare const box: Box<number>;

if (box.done) {
  box.value;
}
