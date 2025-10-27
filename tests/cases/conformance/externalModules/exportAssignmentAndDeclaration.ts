// @module: amd
// @Filename: foo_0.ts
export enum E1 {
	A,B,C
}

class C1 {

}

// Invalid, as there is already an exported member.
export = C1;