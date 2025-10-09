// @strict: true
// @declaration: true

// This file demonstrates cases where Omit is still used (not Partial)
// These are contrast cases to restSpreadingWithKeyofT.ts

// Test case 1: Specific literal key (not keyof T)
function f1<T extends { a: string; b: number; c: boolean }>(obj: T) {
    const { a, ...rest } = obj;
    return rest; // Should be Omit<T, "a">
}

// Test case 2: Multiple specific literal keys
function f2<T extends { a: string; b: number; c: boolean }>(obj: T) {
    const { a, b, ...rest } = obj;
    return rest; // Should be Omit<T, "a" | "b">
}

// Test case 3: K extends string (broader than keyof T)
function f3<T, K extends string>(obj: T, key: K) {
    // This will error because K is not guaranteed to be keyof T
    // but shows the type relationship
}

// Test case 4: Mixing literal and keyof T extends
function f4<T, K extends keyof T>(obj: T, key: K) {
    const { [key]: removed, ...rest } = obj;
    return rest; // Should be Omit<T, K>, not Partial<T> because K is a specific subset of keyof T
}

// Test case 5: Using specific keys from constrained type
type Props = { x: number; y: number; z: number };
function f5<T extends Props>(obj: T) {
    const { x, y, ...rest } = obj;
    return rest; // Should be Omit<T, "x" | "y">
}

// Test case 6: Symbol keys
const sym1 = Symbol();
const sym2 = Symbol();
function f6<T extends { [sym1]: string; [sym2]: number }>(obj: T) {
    const { [sym1]: s1, ...rest } = obj;
    return rest; // Should be Omit<T, typeof sym1>
}
