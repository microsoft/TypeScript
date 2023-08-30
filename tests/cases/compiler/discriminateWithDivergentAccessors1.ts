// @strict: true
// @noEmit: true

type WeirdoBox<T> =
  | { get done(): false; set done(v: T | null) }
  | { get done(): true; set done(v: T | null); value: T };

declare const weirdoBox: WeirdoBox<number>;

if (weirdoBox.done) {
  weirdoBox.value;
}
