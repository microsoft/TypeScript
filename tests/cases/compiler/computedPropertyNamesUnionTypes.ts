// @strict: true
// @noEmit: true

// Fixes #13948: Computed property key names should not be widened when the key
// type is a union of literal types.

interface Person {
    name: string;
    age: number;
}

// Union of string literal keys should produce distributed named properties
function unionStringLiterals(key: 'a' | 'b', value: number) {
    const obj = { [key]: value };
    obj.a; // ok
    obj.b; // ok
}

// keyof should work with computed properties
function keyofComputed(key: keyof Person, value: string | number) {
    const obj = { [key]: value };
    obj.name; // ok
    obj.age;  // ok
}

// Partial<T> assignability (React setState pattern)
declare function setState(state: Partial<Person>): void;
function reactSetState(key: 'name', value: string) {
    setState({ [key]: value }); // should not error
}

// Three-member union
function threeWay(key: 'x' | 'y' | 'z', value: boolean) {
    const obj = { [key]: value };
    obj.x; // ok
    obj.y; // ok
    obj.z; // ok
}

// Number literal union
function numberLiterals(key: 0 | 1, value: string) {
    const obj = { [key]: value };
}

// Union key + fixed properties
function withFixed(key: 'a' | 'b') {
    const obj = { [key]: 1, fixed: 'hello' };
    obj.a;     // ok, number
    obj.b;     // ok, number
    obj.fixed; // ok, string
}

// Mapped type equivalence
type Mapped = { [P in 'x' | 'y']: boolean };
function mappedEquivalence(key: 'x' | 'y', value: boolean) {
    const obj = { [key]: value };
    const mapped: Mapped = obj; // should be assignable
}

// Non-literal key should still produce index signature (unchanged behavior)
function dynamicKey(key: string, value: number) {
    const obj = { [key]: value };
    obj.anything; // ok via index signature
}

// Template literal key should still produce index signature
function templateKey(key: `prefix_${string}`, value: number) {
    const obj = { [key]: value };
}

// Generic extends literal union should work
function genericKey<K extends 'a' | 'b'>(key: K, value: number) {
    const obj = { [key]: value };
}
