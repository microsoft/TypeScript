/// <reference path="fourslash.ts" />

////declare const callableThing1:
////    | ((o1: {x: number}) => void)
////    | ((o1: {y: number}) => void)
////    ;
////
////callableThing1(/*1*/);
////
////declare const callableThing2:
////    | ((o1: {x: number}) => void)
////    | ((o2: {y: number}) => void)
////    ;
////
////callableThing2(/*2*/);
////
////declare const callableThing3:
////    | ((o1: {x: number}) => void)
////    | ((o2: {y: number}) => void)
////    | ((o3: {z: number}) => void)
////    | ((o4: {u: number}) => void)
////    | ((o5: {v: number}) => void)
////    ;
////
////callableThing3(/*3*/);
////
////declare const callableThing4:
////    | ((o1: {x: number}) => void)
////    | ((o2: {y: number}) => void)
////    | ((o3: {z: number}) => void)
////    | ((o4: {u: number}) => void)
////    | ((o5: {v: number}) => void)
////    | ((o6: {w: number}) => void)
////    ;
////
////callableThing4(/*4*/);
////
////declare const callableThing5: 
////    | (<U>(a1: U) => void)
////    | (() => void) 
////    ;
////
////callableThing5(/*5*/1)
////

verify.signatureHelp({
    marker: "1",
    text: "callableThing1(o1: { x: number; } & { y: number; }): void"
},
{
    marker: "2",
    text: "callableThing2(arg0: { x: number; } & { y: number; }): void"
},
{
    marker: "3",
    text: "callableThing3(arg0: { x: number; } & { y: number; } & { z: number; } & { u: number; } & { v: number; }): void"
},
{
    marker: "4",
    text: "callableThing4(arg0: { x: number; } & { y: number; } & { z: number; } & { u: number; } & { v: number; } & { w: number; }): void"
},
{
    marker: "5",
    text: "callableThing5(a1: number): void"
});
