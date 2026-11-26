// @strict: true
// @noEmit: true
// @target: esnext

declare const excludedSymbol: unique symbol;
declare const allowedSymbol: unique symbol;

const excludedNumberProperty: { value: not 0 } = { value: 0 };
const allowedNumberProperty: { value: not 0 } = { value: 1 };

const excludedStringProperty: { value: not "reserved" } = { value: "reserved" };
const allowedStringProperty: { value: not "reserved" } = { value: "allowed" };

const excludedBigIntProperty: { value: not 0n } = { value: 0n };
const allowedBigIntProperty: { value: not 0n } = { value: 1n };

const excludedBooleanProperty: { value: not false } = { value: false };
const allowedBooleanProperty: { value: not false } = { value: true };

const excludedSymbolProperty: { value: not typeof excludedSymbol } = { value: excludedSymbol };
const allowedSymbolProperty: { value: not typeof excludedSymbol } = { value: allowedSymbol };

const excludedUnionProperty: { value: not (0 | 1) } = { value: 0 };
const allowedUnionProperty: { value: not (0 | 1) } = { value: 2 };

const excludedIntersectedProperty: { value: number & not 0 } = { value: 0 };
const allowedIntersectedProperty: { value: number & not 0 } = { value: 1 };

declare function acceptTuple(value: [not "reserved", not 0]): void;
acceptTuple(["reserved", 0]);
acceptTuple(["allowed", 1]);

const excludedArray: (not 0)[] = [0];
const allowedArray: (not 0)[] = [1];