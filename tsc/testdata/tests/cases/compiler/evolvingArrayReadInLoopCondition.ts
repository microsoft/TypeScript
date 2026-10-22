// @strict: true
// @noEmit: true

// Narrowing by the condition needs the type of `seen` at the call, which
// depends on the analysis of the loop in progress for that same read. Once
// the loop is analyzed, `seen` is number[] there, so no error should say that
// its type cannot be determined.

declare const x: number;
const seen = [];
for (let i = 0; i < 3; i++) {
    if (!seen.some(s => true)) {
        seen.push(x);
    }
}
const result = seen;
