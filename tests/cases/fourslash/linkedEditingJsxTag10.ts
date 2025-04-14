/// <reference path='fourslash.ts' />

// @Filename: /jsx0.tsx
////const jsx = </*0*/>

// @Filename: /jsx1.tsx
////const jsx = <//*1*/>

// @Filename: /jsx2.tsx
////const jsx = </*2*/div>

// @Filename: /jsx3.tsx
////const jsx = <//*3*/div>

// @Filename: /jsx4.tsx
////const jsx = </*4*/div> <//*4a*/>;

// @Filename: /jsx5.tsx
////const jsx = </*5*/> <//*5a*/div>;

// @Filename: /jsx6.tsx
////const jsx = /*6*/div> <//*6a*/div>;

// @Filename: /jsx7.tsx
////const jsx = </*7*/div> //*7a*/div>;

// @Filename: /jsx8.tsx
////const jsx = </*8*/div <//*8a*/div>;

// @Filename: /jsx9.tsx
////const jsx = </*9*/div> <//*9a*/div;

// @Filename: /jsx10.tsx
////const jsx = </*10*/> <//*10a*/;

// @Filename: /jsx11.tsx
////const jsx = </*11*/ <//*11a*/>;

// @Filename: /jsx12.tsx
////const jsx = /*12*/> <//*12a*/>;

// @Filename: /jsx13.tsx
////const jsx = </*13*/> //*13a*/>;

// @Filename: /jsx14.tsx
////const jsx = </*14*/> </*14a*/div> <//*14b*/> <//*14c*/div>;

// @Filename: /jsx15.tsx
////const jsx = </*15*/div> </*15a*/> <//*15b*/div> <//*15c*/>;

// as of #57132 none of these cases should have linked editing because the tags are mismatched or missing either < or >
verify.baselineLinkedEditing();