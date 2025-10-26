/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare namespace JSX {
////     interface Element { }
////     interface IntrinsicElements {
////         div: { ONE: string; TWO: number; }
////     }
//// }
//// var x1 = <div> /*1*/ hello /*2*/ world /*3*/</div>;
//// var x2 = <div> /*4*/ <div></div> /*5*/ world /*6*/</div>;
//// var x3 = <div>/*7*/<div/>/*8*/world/*9*/</div>;
//// var x4 = <div>/*10*/</div>;
//// <div/>
//// /*end*/
////

for (var i = 1; i <= 10; i++) {
	verify.completions({ marker: String(i), exact: undefined });
}
verify.completions({ marker: "end", includes: { name: "null", sortText: completion.SortText.GlobalsOrKeywords } });
