//// [ts-expect-error-nocheck.ts]
// @ts-nocheck

// there should not be a "Unused @ts-expect-error" error due to the // @ts-nocheck

// @ts-expect-error
const a = 1;


//// [ts-expect-error-nocheck.js]
// @ts-nocheck
// there should not be a "Unused @ts-expect-error" error due to the // @ts-nocheck
// @ts-expect-error
var a = 1;
