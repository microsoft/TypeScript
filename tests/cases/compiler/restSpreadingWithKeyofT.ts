// @strict: true
// @declaration: true

// Test case 1: Using keyof T directly in rest spreading
// Should result in Partial<T> instead of Omit<T, keyof T>
function f1<T>(obj: T, key: keyof T) {
    const { [key]: removed, ...rest } = obj;
    return rest;
}

// Test case 2: Union of keyof T
// Should result in Partial<T> since both k1 and k2 are keyof T
function f2<T>(obj: T, k1: keyof T, k2: keyof T) {
    const { [k1]: removed1, [k2]: removed2, ...rest } = obj;
    return rest;
}

// Test case 3: keyof T with additional literal
// Should still use Partial<T> since the union contains keyof T
function f3<T>(obj: T, key: keyof T | "extra") {
    const { [key]: removed, ...rest } = obj;
    return rest;
}

// Test case 4: Specific type with keyof
type MyObj = { a: string; b: number; c: boolean; };
function f4(obj: MyObj, key: keyof MyObj) {
    const { [key]: removed, ...rest } = obj;
    return rest;
}

// Test case 5: Constraint with keyof
function f5<T extends { a: string; b: number }>(obj: T, key: keyof T) {
    const { [key]: removed, ...rest } = obj;
    return rest;
}

// Test case 6: Multiple parameters with keyof in object literal
function f6<T>(obj: T, k1: keyof T, k2: keyof T, k3: keyof T) {
    const { [k1]: r1, [k2]: r2, [k3]: r3, ...rest } = obj;
    return rest;
}

// Test case 7: Nested rest with keyof
function f7<T>(obj: T, key: keyof T) {
    const { [key]: val, ...rest } = obj;
    const consumed = val;
    return { consumed, rest };
}

// Test case 8: Array of keyof (not applicable but shows edge case)
function f8<T>(obj: T, keys: Array<keyof T>) {
    // Can't destructure with array, but showing the type relationship
    const key = keys[0];
    const { [key]: removed, ...rest } = obj;
    return rest;
}
