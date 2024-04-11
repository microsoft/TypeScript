//// [tests/cases/conformance/types/typeRelationships/comparable/weakTypesAndLiterals01.ts] ////

//// [weakTypesAndLiterals01.ts]
type WeakTypes =
    | { optional?: true; }
    | { toLowerCase?(): string }
    | { toUpperCase?(): string, otherOptionalProp?: number };

type LiteralsOrWeakTypes =
    | "A"
    | "B"
    | WeakTypes;

declare let aOrB: "A" | "B";

const f = (arg: LiteralsOrWeakTypes) => {
    if (arg === "A") {
        return arg;
    }
    else {
        return arg;
    }
}

const g = (arg: WeakTypes) => {
    if (arg === "A") {
        return arg;
    }
    else {
        return arg;
    }
}

const h = (arg: LiteralsOrWeakTypes) => {
    if (arg === aOrB) {
        return arg;
    }
    else {
        return arg;
    }
}

const i = (arg: WeakTypes) => {
    if (arg === aOrB) {
        return arg;
    }
    else {
        return arg;
    }
}




//// [weakTypesAndLiterals01.d.ts]
type WeakTypes = {
    optional?: true;
} | {
    toLowerCase?(): string;
} | {
    toUpperCase?(): string;
    otherOptionalProp?: number;
};
type LiteralsOrWeakTypes = "A" | "B" | WeakTypes;
declare let aOrB: "A" | "B";
declare const f: (arg: LiteralsOrWeakTypes) => WeakTypes | "A" | "B";
declare const g: (arg: WeakTypes) => WeakTypes;
declare const h: (arg: LiteralsOrWeakTypes) => LiteralsOrWeakTypes;
declare const i: (arg: WeakTypes) => WeakTypes;


!!!! File weakTypesAndLiterals01.d.ts differs from original emit in noCheck emit
//// [weakTypesAndLiterals01.d.ts]
===================================================================
--- Expected	The full check baseline
+++ Actual	with noCheck set
@@ -7,8 +7,8 @@
     otherOptionalProp?: number;
 };
 type LiteralsOrWeakTypes = "A" | "B" | WeakTypes;
 declare let aOrB: "A" | "B";
-declare const f: (arg: LiteralsOrWeakTypes) => WeakTypes | "A" | "B";
+declare const f: (arg: LiteralsOrWeakTypes) => "A" | "B" | WeakTypes;
 declare const g: (arg: WeakTypes) => WeakTypes;
 declare const h: (arg: LiteralsOrWeakTypes) => LiteralsOrWeakTypes;
 declare const i: (arg: WeakTypes) => WeakTypes;
