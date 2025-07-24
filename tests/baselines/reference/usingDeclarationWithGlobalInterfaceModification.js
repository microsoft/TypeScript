//// [tests/cases/compiler/usingDeclarationWithGlobalInterfaceModification.ts] ////

//// [usingDeclarationWithGlobalInterfaceModification.ts]
// Test case that demonstrates the issue from https://github.com/microsoft/TypeScript/issues/62121
// When an empty global Disposable interface is declared, it should NOT affect
// the checking for Symbol.dispose properties

declare global {
  interface Disposable {}
}

// This should pass - has Symbol.dispose method
const validDisposable = {
    [Symbol.dispose]() {
        // disposed
    }
};

// This should fail - no Symbol.dispose method
const invalidDisposable = {
    cleanup() {
        // cleanup
    }
};

// With the fix, the checker should directly check for Symbol.dispose properties
// rather than relying on assignability to the global Disposable interface
using valid = validDisposable;      // should pass
using invalid = invalidDisposable;  // should error

export {};

//// [usingDeclarationWithGlobalInterfaceModification.js]
// Test case that demonstrates the issue from https://github.com/microsoft/TypeScript/issues/62121
// When an empty global Disposable interface is declared, it should NOT affect
// the checking for Symbol.dispose properties
// This should pass - has Symbol.dispose method
const validDisposable = {
    [Symbol.dispose]() {
        // disposed
    }
};
// This should fail - no Symbol.dispose method
const invalidDisposable = {
    cleanup() {
        // cleanup
    }
};
// With the fix, the checker should directly check for Symbol.dispose properties
// rather than relying on assignability to the global Disposable interface
using valid = validDisposable; // should pass
using invalid = invalidDisposable; // should error
export {};
