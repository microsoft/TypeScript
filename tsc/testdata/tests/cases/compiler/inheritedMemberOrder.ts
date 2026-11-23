// @noEmit: true

// https://github.com/microsoft/TypeScript/issues/65052

export const empty: C<string> = {};
declare const narrowB: B<{ a: string }>;
export const wideB: B<{ a: string; b?: number }> = narrowB;
declare const narrowC: C<{ a: string }>;
export const wideC: C<{ a: string; b?: number }> = narrowC;

interface A<T> {
  inherited: () => T;
}
interface B<T> extends A<T> {
  own: (x: T) => Required<T>;
}
interface C<T> extends B<T> {}
