/// <reference path="fourslash.ts"/>

////type A =[| {
////    a: number;
////}|]
////
////type B =[| {
////   a:[| {
////       a1:[| {
////           a2:[| {
////               x: number;
////               y: number;
////           }|]
////       }|]
////   }|],
////   b:[| {
////       x: number;
////   }|],
////   c:[| {
////       x: number;
////   }|]
////}|]

verify.outliningSpansInCurrentFile(test.ranges(), "code");
