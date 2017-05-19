/// <reference path='fourslash.ts' />

//@Filename: file.tsx
//// declare module JSX {
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
	goTo.marker(i + '');
	verify.completionListIsEmpty();
}

goTo.marker('end');
verify.not.completionListIsEmpty();
