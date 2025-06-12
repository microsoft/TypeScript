//// [tests/cases/compiler/assignmentIndexedToPrimitives.ts] ////

//// [assignmentIndexedToPrimitives.ts]
const n1: number = [0];
const n2: number = ["0"];
const n3: number = [0, "1"];
const n4: 0 = [0];

const s1: string = [0];
const s2: string = ["0"];
const s3: string = [0, "1"];
const s4: "01" = ["0", "1"];

const no1: number = { 0: 1 };

const so1: string = { 0: 1 };
const so2: string = { "0": 1 };
const so3: string = { 0: "1" };


//// [assignmentIndexedToPrimitives.js]
const n1 = [0];
const n2 = ["0"];
const n3 = [0, "1"];
const n4 = [0];
const s1 = [0];
const s2 = ["0"];
const s3 = [0, "1"];
const s4 = ["0", "1"];
const no1 = { 0: 1 };
const so1 = { 0: 1 };
const so2 = { "0": 1 };
const so3 = { 0: "1" };
