/// <reference path='fourslash.ts' />

////module M {
////    export interface I { }
////    export class C {
////        static property;
////    }
////    export enum E {
////        value = 0
////    }
////    export module N {
////        export var v;
////    }
////    export var V = 0;
////    export function F() { }
////    export import A = M;
////}
////
////import m = M;
////import c = M.C;
////import e = M.E;
////import n = M.N;
////import v = M.V;
////import f = M.F;
////import a = M.A;
////
////m./*1*/;
////var tmp: m./*1Type*/;
////c./*2*/;
////e./*3*/;
////n./*4*/;
////v./*5*/;
////f./*6*/;
////a./*7*/;
////var tmp2: a./*7Type*/;

function getVerify(isTypeLocation?: boolean) {
    return {
        verifyValue: isTypeLocation ? verify.not : verify,
        verifyType: isTypeLocation ? verify : verify.not,
        verifyValueOrType: verify
    };
}
function typeLocationVerify(valueMarker: string, verify: (typeMarker: string) => void) {
    verify(valueMarker + "Type");
    return valueMarker;
}

function verifyModuleM(marker: string) {
    const isTypeLocation = marker.indexOf("Type") !== -1;
    const { verifyValue, verifyType, verifyValueOrType } = getVerify(isTypeLocation);
    if (!isTypeLocation) {
        marker = typeLocationVerify(marker, verifyModuleM);
    }
    goTo.marker(marker);

    verifyType.completionListContains("I");
    verifyValueOrType.completionListContains("C");
    verifyValueOrType.completionListContains("E");
    verifyValue.completionListContains("N");
    verifyValue.completionListContains("V");
    verifyValue.completionListContains("F");
    verifyValueOrType.completionListContains("A");
}


// Module m
verifyModuleM("1");

// Class C
goTo.marker("2");
verify.completionListContains("property");

// Enum E
goTo.marker("3");
verify.completionListContains("value");

// Module N
goTo.marker("4");
verify.completionListContains("v");

// var V
goTo.marker("5");
verify.completionListContains("toFixed");

// function F
goTo.marker("6");
verify.completionListContains("call");

// alias a
verifyModuleM("7");