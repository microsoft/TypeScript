// @strict: true
// @noEmit: true

declare const valueMarker: unique symbol;
type AnyValue = { [valueMarker]?: undefined } | number;
declare function compare<Value>(value: Value & AnyValue): void;
compare((): number => 0);
