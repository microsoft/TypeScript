/// <reference path="fourslash.ts" />

////const o = 'something' 
////const obj = {
////    prop: o/*1*/,
////    pro() {
////        const obj1 = {
////            p:{
////                s: {
////                    h: {
////                       hh: o/*2*/
////                    },
////                    someFun() {
////                        o/*3*/
////                    }
////                }
////            }
////        }
////    },
////    o/*4*/
////}

verify.completions({ marker: ["1"], excludes: ['obj'], includes: ['o'] });
verify.completions({ marker: ["2"], excludes: ['obj1'], includes: ['o', 'obj'] });
verify.completions({ marker: ["3"], includes: ['o', 'obj', 'obj1'] });
verify.completions({ marker: ["4"], includes: ['o'], excludes: ['obj'], isNewIdentifierLocation: true });