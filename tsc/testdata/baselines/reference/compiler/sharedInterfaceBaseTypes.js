//// [tests/cases/compiler/sharedInterfaceBaseTypes.ts] ////

//// [sharedInterfaceBaseTypes.ts]
// https://github.com/microsoft/TypeScript/issues/63555

// Both interfaces at each level extend the previous level, so I40 reaches I0
// through 2^40 paths. Checking each base type for circularity must not walk them all.

interface I0 { i0: string }
interface A1 extends I0 { a1: string }
interface B1 extends I0 { b1: string }
interface I1 extends A1, B1 {}
interface A2 extends I1 { a2: string }
interface B2 extends I1 { b2: string }
interface I2 extends A2, B2 {}
interface A3 extends I2 { a3: string }
interface B3 extends I2 { b3: string }
interface I3 extends A3, B3 {}
interface A4 extends I3 { a4: string }
interface B4 extends I3 { b4: string }
interface I4 extends A4, B4 {}
interface A5 extends I4 { a5: string }
interface B5 extends I4 { b5: string }
interface I5 extends A5, B5 {}
interface A6 extends I5 { a6: string }
interface B6 extends I5 { b6: string }
interface I6 extends A6, B6 {}
interface A7 extends I6 { a7: string }
interface B7 extends I6 { b7: string }
interface I7 extends A7, B7 {}
interface A8 extends I7 { a8: string }
interface B8 extends I7 { b8: string }
interface I8 extends A8, B8 {}
interface A9 extends I8 { a9: string }
interface B9 extends I8 { b9: string }
interface I9 extends A9, B9 {}
interface A10 extends I9 { a10: string }
interface B10 extends I9 { b10: string }
interface I10 extends A10, B10 {}
interface A11 extends I10 { a11: string }
interface B11 extends I10 { b11: string }
interface I11 extends A11, B11 {}
interface A12 extends I11 { a12: string }
interface B12 extends I11 { b12: string }
interface I12 extends A12, B12 {}
interface A13 extends I12 { a13: string }
interface B13 extends I12 { b13: string }
interface I13 extends A13, B13 {}
interface A14 extends I13 { a14: string }
interface B14 extends I13 { b14: string }
interface I14 extends A14, B14 {}
interface A15 extends I14 { a15: string }
interface B15 extends I14 { b15: string }
interface I15 extends A15, B15 {}
interface A16 extends I15 { a16: string }
interface B16 extends I15 { b16: string }
interface I16 extends A16, B16 {}
interface A17 extends I16 { a17: string }
interface B17 extends I16 { b17: string }
interface I17 extends A17, B17 {}
interface A18 extends I17 { a18: string }
interface B18 extends I17 { b18: string }
interface I18 extends A18, B18 {}
interface A19 extends I18 { a19: string }
interface B19 extends I18 { b19: string }
interface I19 extends A19, B19 {}
interface A20 extends I19 { a20: string }
interface B20 extends I19 { b20: string }
interface I20 extends A20, B20 {}
interface A21 extends I20 { a21: string }
interface B21 extends I20 { b21: string }
interface I21 extends A21, B21 {}
interface A22 extends I21 { a22: string }
interface B22 extends I21 { b22: string }
interface I22 extends A22, B22 {}
interface A23 extends I22 { a23: string }
interface B23 extends I22 { b23: string }
interface I23 extends A23, B23 {}
interface A24 extends I23 { a24: string }
interface B24 extends I23 { b24: string }
interface I24 extends A24, B24 {}
interface A25 extends I24 { a25: string }
interface B25 extends I24 { b25: string }
interface I25 extends A25, B25 {}
interface A26 extends I25 { a26: string }
interface B26 extends I25 { b26: string }
interface I26 extends A26, B26 {}
interface A27 extends I26 { a27: string }
interface B27 extends I26 { b27: string }
interface I27 extends A27, B27 {}
interface A28 extends I27 { a28: string }
interface B28 extends I27 { b28: string }
interface I28 extends A28, B28 {}
interface A29 extends I28 { a29: string }
interface B29 extends I28 { b29: string }
interface I29 extends A29, B29 {}
interface A30 extends I29 { a30: string }
interface B30 extends I29 { b30: string }
interface I30 extends A30, B30 {}
interface A31 extends I30 { a31: string }
interface B31 extends I30 { b31: string }
interface I31 extends A31, B31 {}
interface A32 extends I31 { a32: string }
interface B32 extends I31 { b32: string }
interface I32 extends A32, B32 {}
interface A33 extends I32 { a33: string }
interface B33 extends I32 { b33: string }
interface I33 extends A33, B33 {}
interface A34 extends I33 { a34: string }
interface B34 extends I33 { b34: string }
interface I34 extends A34, B34 {}
interface A35 extends I34 { a35: string }
interface B35 extends I34 { b35: string }
interface I35 extends A35, B35 {}
interface A36 extends I35 { a36: string }
interface B36 extends I35 { b36: string }
interface I36 extends A36, B36 {}
interface A37 extends I36 { a37: string }
interface B37 extends I36 { b37: string }
interface I37 extends A37, B37 {}
interface A38 extends I37 { a38: string }
interface B38 extends I37 { b38: string }
interface I38 extends A38, B38 {}
interface A39 extends I38 { a39: string }
interface B39 extends I38 { b39: string }
interface I39 extends A39, B39 {}
interface A40 extends I39 { a40: string }
interface B40 extends I39 { b40: string }
interface I40 extends A40, B40 {}

declare const viaInterfaces: I40;
viaInterfaces.i0;

// The same graph through intersections.

interface J0 { j0: string }
interface C1 extends J0 { c1: string }
interface D1 extends J0 { d1: string }
interface J1 extends Both1 {}
type Both1 = C1 & D1;
interface C2 extends J1 { c2: string }
interface D2 extends J1 { d2: string }
interface J2 extends Both2 {}
type Both2 = C2 & D2;
interface C3 extends J2 { c3: string }
interface D3 extends J2 { d3: string }
interface J3 extends Both3 {}
type Both3 = C3 & D3;
interface C4 extends J3 { c4: string }
interface D4 extends J3 { d4: string }
interface J4 extends Both4 {}
type Both4 = C4 & D4;
interface C5 extends J4 { c5: string }
interface D5 extends J4 { d5: string }
interface J5 extends Both5 {}
type Both5 = C5 & D5;
interface C6 extends J5 { c6: string }
interface D6 extends J5 { d6: string }
interface J6 extends Both6 {}
type Both6 = C6 & D6;
interface C7 extends J6 { c7: string }
interface D7 extends J6 { d7: string }
interface J7 extends Both7 {}
type Both7 = C7 & D7;
interface C8 extends J7 { c8: string }
interface D8 extends J7 { d8: string }
interface J8 extends Both8 {}
type Both8 = C8 & D8;
interface C9 extends J8 { c9: string }
interface D9 extends J8 { d9: string }
interface J9 extends Both9 {}
type Both9 = C9 & D9;
interface C10 extends J9 { c10: string }
interface D10 extends J9 { d10: string }
interface J10 extends Both10 {}
type Both10 = C10 & D10;
interface C11 extends J10 { c11: string }
interface D11 extends J10 { d11: string }
interface J11 extends Both11 {}
type Both11 = C11 & D11;
interface C12 extends J11 { c12: string }
interface D12 extends J11 { d12: string }
interface J12 extends Both12 {}
type Both12 = C12 & D12;
interface C13 extends J12 { c13: string }
interface D13 extends J12 { d13: string }
interface J13 extends Both13 {}
type Both13 = C13 & D13;
interface C14 extends J13 { c14: string }
interface D14 extends J13 { d14: string }
interface J14 extends Both14 {}
type Both14 = C14 & D14;
interface C15 extends J14 { c15: string }
interface D15 extends J14 { d15: string }
interface J15 extends Both15 {}
type Both15 = C15 & D15;
interface C16 extends J15 { c16: string }
interface D16 extends J15 { d16: string }
interface J16 extends Both16 {}
type Both16 = C16 & D16;
interface C17 extends J16 { c17: string }
interface D17 extends J16 { d17: string }
interface J17 extends Both17 {}
type Both17 = C17 & D17;
interface C18 extends J17 { c18: string }
interface D18 extends J17 { d18: string }
interface J18 extends Both18 {}
type Both18 = C18 & D18;
interface C19 extends J18 { c19: string }
interface D19 extends J18 { d19: string }
interface J19 extends Both19 {}
type Both19 = C19 & D19;
interface C20 extends J19 { c20: string }
interface D20 extends J19 { d20: string }
interface J20 extends Both20 {}
type Both20 = C20 & D20;
interface C21 extends J20 { c21: string }
interface D21 extends J20 { d21: string }
interface J21 extends Both21 {}
type Both21 = C21 & D21;
interface C22 extends J21 { c22: string }
interface D22 extends J21 { d22: string }
interface J22 extends Both22 {}
type Both22 = C22 & D22;
interface C23 extends J22 { c23: string }
interface D23 extends J22 { d23: string }
interface J23 extends Both23 {}
type Both23 = C23 & D23;
interface C24 extends J23 { c24: string }
interface D24 extends J23 { d24: string }
interface J24 extends Both24 {}
type Both24 = C24 & D24;
interface C25 extends J24 { c25: string }
interface D25 extends J24 { d25: string }
interface J25 extends Both25 {}
type Both25 = C25 & D25;
interface C26 extends J25 { c26: string }
interface D26 extends J25 { d26: string }
interface J26 extends Both26 {}
type Both26 = C26 & D26;
interface C27 extends J26 { c27: string }
interface D27 extends J26 { d27: string }
interface J27 extends Both27 {}
type Both27 = C27 & D27;
interface C28 extends J27 { c28: string }
interface D28 extends J27 { d28: string }
interface J28 extends Both28 {}
type Both28 = C28 & D28;
interface C29 extends J28 { c29: string }
interface D29 extends J28 { d29: string }
interface J29 extends Both29 {}
type Both29 = C29 & D29;
interface C30 extends J29 { c30: string }
interface D30 extends J29 { d30: string }
interface J30 extends Both30 {}
type Both30 = C30 & D30;
interface C31 extends J30 { c31: string }
interface D31 extends J30 { d31: string }
interface J31 extends Both31 {}
type Both31 = C31 & D31;
interface C32 extends J31 { c32: string }
interface D32 extends J31 { d32: string }
interface J32 extends Both32 {}
type Both32 = C32 & D32;
interface C33 extends J32 { c33: string }
interface D33 extends J32 { d33: string }
interface J33 extends Both33 {}
type Both33 = C33 & D33;
interface C34 extends J33 { c34: string }
interface D34 extends J33 { d34: string }
interface J34 extends Both34 {}
type Both34 = C34 & D34;
interface C35 extends J34 { c35: string }
interface D35 extends J34 { d35: string }
interface J35 extends Both35 {}
type Both35 = C35 & D35;
interface C36 extends J35 { c36: string }
interface D36 extends J35 { d36: string }
interface J36 extends Both36 {}
type Both36 = C36 & D36;
interface C37 extends J36 { c37: string }
interface D37 extends J36 { d37: string }
interface J37 extends Both37 {}
type Both37 = C37 & D37;
interface C38 extends J37 { c38: string }
interface D38 extends J37 { d38: string }
interface J38 extends Both38 {}
type Both38 = C38 & D38;
interface C39 extends J38 { c39: string }
interface D39 extends J38 { d39: string }
interface J39 extends Both39 {}
type Both39 = C39 & D39;
interface C40 extends J39 { c40: string }
interface D40 extends J39 { d40: string }
interface J40 extends Both40 {}
type Both40 = C40 & D40;

declare const viaIntersections: J40;
viaIntersections.j0;

// Cycles through shared base types are still reported.

interface Leaf { leaf: string }
interface Left extends Leaf {}
interface Right extends Leaf {}
interface Shared extends Left, Right {}
interface Cycle1 extends Shared, Cycle2 {}
interface Cycle2 extends Left, Cycle1 {}
interface Self extends Shared, Self {}

// A default type argument that refers to the derived interface is not a cycle.

interface DefaultBase<T = DefaultDerived> extends Shared { next?: T }
interface DefaultDerived extends DefaultBase {}


//// [sharedInterfaceBaseTypes.js]
"use strict";
// https://github.com/microsoft/TypeScript/issues/63555
viaInterfaces.i0;
viaIntersections.j0;
