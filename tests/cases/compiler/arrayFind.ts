// @lib: es2015

// test fix for #18112, type guard predicates should narrow returned element
function isNumber(x: any): x is number {
  return typeof x === "number";
}

const arrayOfStringsNumbersAndBooleans = ["string", false, 0, "strung", 1, true];
const foundNumber: number | undefined = arrayOfStringsNumbersAndBooleans.find(isNumber);

const readonlyArrayOfStringsNumbersAndBooleans = arrayOfStringsNumbersAndBooleans as ReadonlyArray<string | number | boolean>;
const readonlyFoundNumber: number | undefined = readonlyArrayOfStringsNumbersAndBooleans.find(isNumber);

// test for #38959
interface Foo { kind: "foo"; foo: string; }
interface Bar { kind: "bar"; bar: string; }
type FooBar = Foo | Bar;
const fooBar: FooBar[] = [];
const foundBar: Bar | undefined = fooBar.find<Bar>((t) => t.kind === "bar" && t.bar === "value");
