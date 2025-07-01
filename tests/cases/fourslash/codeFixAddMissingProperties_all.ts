/// <reference path='fourslash.ts' />

////interface I1 {
////    a: number;
////    b: string;
////    c: 1;
////    d: "d";
////    e: "e1" | "e2";
////    f(x: number, y: number): void;
////    g: (x: number, y: number) => void;
////}
////interface I2 {
////    a: unknown;
////    b: any;
////}
////const a: I1 = {};
////const b: I2 = {};
////class C1 {
////     public c: I1 = {};
////}
////function fn1(foo: I2 = {}) {}
////function fn2(a: I1) {}
////fn2({});
////const d = {} satisfies I1;
////const e = {} satisfies I2;
////class C2 {
////     public f = {} satisfies I1;
////}

verify.codeFixAll({
    fixId: "fixMissingProperties",
    fixAllDescription: ts.Diagnostics.Add_all_missing_properties.message,
    newFileContent:
`interface I1 {
    a: number;
    b: string;
    c: 1;
    d: "d";
    e: "e1" | "e2";
    f(x: number, y: number): void;
    g: (x: number, y: number) => void;
}
interface I2 {
    a: unknown;
    b: any;
}
const a: I1 = {
    a: 0,
    b: "",
    c: 1,
    d: "d",
    e: "e1",
    f: function(x: number, y: number): void {
        throw new Error("Function not implemented.");
    },
    g: function(x: number, y: number): void {
        throw new Error("Function not implemented.");
    }
};
const b: I2 = {
    a: undefined,
    b: undefined
};
class C1 {
     public c: I1 = {
         a: 0,
         b: "",
         c: 1,
         d: "d",
         e: "e1",
         f: function(x: number, y: number): void {
             throw new Error("Function not implemented.");
         },
         g: function(x: number, y: number): void {
             throw new Error("Function not implemented.");
         }
     };
}
function fn1(foo: I2 = {
    a: undefined,
    b: undefined
}) {}
function fn2(a: I1) {}
fn2({
    a: 0,
    b: "",
    c: 1,
    d: "d",
    e: "e1",
    f: function(x: number, y: number): void {
        throw new Error("Function not implemented.");
    },
    g: function(x: number, y: number): void {
        throw new Error("Function not implemented.");
    }
});
const d = {
    a: 0,
    b: "",
    c: 1,
    d: "d",
    e: "e1",
    f: function(x: number, y: number): void {
        throw new Error("Function not implemented.");
    },
    g: function(x: number, y: number): void {
        throw new Error("Function not implemented.");
    }
} satisfies I1;
const e = {
    a: undefined,
    b: undefined
} satisfies I2;
class C2 {
     public f = {
         a: 0,
         b: "",
         c: 1,
         d: "d",
         e: "e1",
         f: function(x: number, y: number): void {
             throw new Error("Function not implemented.");
         },
         g: function(x: number, y: number): void {
             throw new Error("Function not implemented.");
         }
     } satisfies I1;
}`
});
