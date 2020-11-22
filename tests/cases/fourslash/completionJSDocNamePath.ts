// @noLib: true

/// <reference path='fourslash.ts'/>

// fix crash from #38407

//// /**
////  * @returns {modu/*1*/le:ControlFlow}
////  */
//// export function cargo() {
//// }

goTo.marker('1');
verify.completions({ marker: "1", excludes: ["module", "ControlFlow"] });

