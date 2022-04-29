//// [tests/cases/compiler/importExportInternalComments.ts] ////

//// [include.d.ts]
declare module "foo";

//// [default.ts]
/*1*/ export /*2*/ default /*3*/ Array /*4*/;

//// [index.ts]
/*1*/ import /*2*/ D /*3*/, /*4*/ { /*5*/ A /*6*/, /*7*/ B /*8*/ as /*9*/ C /*10*/ } /*11*/ from /*12*/ "foo";
/*1*/ import /*2*/ * /*3*/ as /*4*/ foo /*5*/ from /*6*/ "foo";

void D, A, C, foo; // Use the variables to prevent ellision

/*1*/ export /*2*/ { /*3*/ A /*4*/, /*5*/ B /*6*/ as /*7*/ C /*8*/ } /*9*/ from /*10*/ "foo";
/*1*/ export /*2*/ * /*3*/ from /*4*/ "foo"

//// [default.js]
/*1*/ export /*2*/ default /*3*/ Array /*4*/;
//// [index.js]
/*1*/ import /*2*/ D /*3*/, /*4*/ { /*5*/ A /*6*/, /*7*/ B /*8*/ as /*9*/ C /*10*/ } /*11*/ from /*12*/ "foo";
/*1*/ import /*2*/ * /*3*/ as /*4*/ foo /*5*/ from /*6*/ "foo";
void D, A, C, foo; // Use the variables to prevent ellision
/*1*/ export /*2*/ { /*3*/ A /*4*/, /*5*/ B /*6*/ as /*7*/ C /*8*/ } /*9*/ from /*10*/ "foo";
/*1*/ export /*2*/ * /*3*/ from /*4*/ "foo";
