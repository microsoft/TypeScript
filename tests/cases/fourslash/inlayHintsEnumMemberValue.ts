/// <reference path="fourslash.ts" />

//// enum E {
////     A,
////     AA,
////     B = 10,
////     BB,
////     C = 'C',
//// }

verify.baselineInlayHints(undefined, {
    includeInlayEnumMemberValueHints: true,
});
