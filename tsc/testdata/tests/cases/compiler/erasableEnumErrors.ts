// @strict: true
// @target: esnext

// Members require explicit property assignments, even for constant bindings.
const UnboundShorthand: enum = { missing };
const shorthandValue = 1;
const Shorthand: enum = ({ shorthandValue });

// Member values must be compile-time string or number constants.
declare const symbolValue: unique symbol;
const Invalid: enum = {
    True: true,
    False: false,
    Null: null,
    Object: {},
    BigInt: 1n,
    Symbol: symbolValue,
};
const DynamicCall: enum = { Value: Math.random() };
const dynamicValue: DynamicCall = DynamicCall.Value; // no cascading type errors.
let mutable = 1;
const MutableValue: enum = { Value: mutable };
const dynamic = Math.random();
const NonconstantBinding: enum = { Value: dynamic };
declare const broadNumber: number;
declare const broadString: string;
const BroadValues: enum = { Number: broadNumber, String: broadString };

// Assertions and satisfies expressions block constant evaluation, including through references.
const AssertionBoundary: enum = ({ Value: 1 as number, Nested: (1 as number) + 1 });
const SatisfiesBoundary: enum = { Value: "value" satisfies string };
const asserted = 1 as number;
const checked = "value" satisfies string;
const ReferencedBoundaries: enum = { Asserted: asserted, Checked: checked };

// Names must be identifiers or strings; computed names are forbidden even when constant.
const NumericKey: enum = { 1: "one" };
const ComputedKey: enum = { ["foo"]: 1 };
const key = "Known";
const ComputedKeyReference: enum = { [key]: 1 };
const ComputedPrototypeKey: enum = { ["__proto__"]: 1 };
const prototypeValue = ComputedPrototypeKey.__proto__;

const Numeric: enum = { First: 1, Second: 2 };
const Spread: enum = { ...Numeric };
const Method: enum = { method() {} };
const Getter: enum = { get value() { return 1; } };
const Setter: enum = { set value(value: number) {} };

// Members are readonly and numeric reverse mappings are absent.
Numeric.First = Numeric.Second;
const reverse = Numeric[1];
const unknownKey = Numeric.Unknown;

// Initializers use ordinary lexical bindings, without a scope for enum members.
const Unqualified: enum = { A: 1, B: A };
const SelfReference: enum = { A: 1, B: SelfReference.A };
var VarSelfReference: enum = { A: 1, B: VarSelfReference.A };
// Deferred callbacks avoid initialization errors; calls are still nonconstant.
const Deferred: enum = { A: ((f: () => number): number => 1)((): number => Deferred.B), B: 1 };
const Immediate: enum = { A: ((): number => Immediate.B)(), B: 1 };
const OuterMember = 10;
const Lexical: enum = { OuterMember: 1, Value: OuterMember };
const lexicalValue: Lexical.Value = 10; // ok: Value refers to the outer constant.

// Duplicate keys follow object literal rules; bindings cannot be redeclared.
const Duplicate: enum = { A: 1, A: 2 };
const Repeated: enum = { A: 1 };
const Repeated: enum = { B: 2 };

// Only a null prototype setter is allowed, and it does not declare an enum member.
const PrototypeKey: enum = { __proto__: 1 };
const QuotedPrototypeKey: enum = { "__proto__": 1 };
const PrototypeObject: enum = { __proto__: {} };
const AssertedPrototype: enum = { __proto__: null as null };
const NullPrototype: enum = { __proto__: null, A: 1 };
const nullPrototypeMember = NullPrototype.__proto__;
const __proto__ = "own";
const PrototypeShorthand: enum = { __proto__ };

// The annotation requires a named variable statement with an object literal initializer.
let NoInitializer: enum;
const NonObject: enum = 1;
const { Destructuring }: enum = { Destructuring: 1 };
for (const ForInitializer: enum = { A: 1 }; false; ) {}
