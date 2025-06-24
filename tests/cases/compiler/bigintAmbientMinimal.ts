// @target: ES5

// @Filename: /ambient.d.ts
declare const fromDts = 789n;
declare namespace Lib {
    const value = 999n;
}

// @Filename: /main.ts
// Minimal repro from issue
declare const n = 123n;

// Non-ambient for comparison
const regular = 456n;