//// [tests/cases/compiler/usedBeforeAssignedTypeAssertion.ts] ////

//// [usedBeforeAssignedTypeAssertion.ts]
// Test case for type assertion (angle bracket syntax) - assignment should not error
function testTypeAssertion() {
    let x: number;
    (<any>x) = 42; // Should not error - this is an assignment
}

// Test case for 'as' expression - assignment should not error 
function testAsExpression() {
    let y: number;
    (y as any) = 42; // Should not error - this is an assignment
}

// Test case for parenthesized expression (should already work)
function testParentheses() {
    let z: number;
    (z) = 42; // Should not error - this is an assignment
}

// Test case with nested type assertions
function testNested() {
    let nested: any;
    ((nested as any) as unknown) = "test"; // Should not error
}

// Test case for const assignment via type assertion - should error
function testConstAssignment() {
    const m = 32;
    (m as any) = 16; // Should error - cannot assign to const
}

// Test case for readonly property assignment via type assertion - should error
function testReadonlyPropertyAssignment() {
    interface ReadonlyInterface {
        readonly prop: number;
    }
    
    let obj: ReadonlyInterface;
    obj = { prop: 42 };
    
    // Should error - cannot assign to readonly property, even through type assertion
    (obj.prop as any) = 100;
}

// Test cases that should still produce errors for proper context
function shouldStillError() {
    let uninitialized: number;
    return uninitialized; // Should error - never assigned
}

//// [usedBeforeAssignedTypeAssertion.js]
"use strict";
// Test case for type assertion (angle bracket syntax) - assignment should not error
function testTypeAssertion() {
    var x;
    x = 42; // Should not error - this is an assignment
}
// Test case for 'as' expression - assignment should not error 
function testAsExpression() {
    var y;
    y = 42; // Should not error - this is an assignment
}
// Test case for parenthesized expression (should already work)
function testParentheses() {
    var z;
    (z) = 42; // Should not error - this is an assignment
}
// Test case with nested type assertions
function testNested() {
    var nested;
    nested = "test"; // Should not error
}
// Test case for const assignment via type assertion - should error
function testConstAssignment() {
    var m = 32;
    m = 16; // Should error - cannot assign to const
}
// Test case for readonly property assignment via type assertion - should error
function testReadonlyPropertyAssignment() {
    var obj;
    obj = { prop: 42 };
    // Should error - cannot assign to readonly property, even through type assertion
    obj.prop = 100;
}
// Test cases that should still produce errors for proper context
function shouldStillError() {
    var uninitialized;
    return uninitialized; // Should error - never assigned
}
