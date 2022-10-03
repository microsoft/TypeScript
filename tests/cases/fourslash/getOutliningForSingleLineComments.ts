/// <reference path="fourslash.ts"/>

////[|// Single line comments at the start of the file
////// line 2
////// line 3
////// line 4|]
////module Sayings[| {
////
////    [|/*
////    */|]
////    [|// A sequence of
////    // single line|]
////    [|/*
////        and block
////    */|]
////    [|// comments
////    //|]
////    export class Sample[| {
////    }|]
////}|]
////
////interface IFoo[| {
////    [|// all consecutive single line comments should be in one block regardless of their number or empty lines/spaces inbetween
////
////    // comment 2
////    // comment 3
////
////    //comment 4
////    /// comment 5
////    ///// comment 6
////
////    //comment 7
////    ///comment 8
////    // comment 9
////    // //comment 10
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////
////    // // //comment 11
////    // comment 12
////    // comment 13
////    // comment 14
////    // comment 15
////
////    // comment 16
////    // comment 17
////    // comment 18
////    // comment 19
////    // comment 20    
////    // comment 21|]
////
////    getDist(): number; // One single line comment should not be collapsed
////}|]
////
////// One single line comment should not be collapsed
////class WithOneSingleLineComment[| {
////}|]
////
////function Foo()[| {
////   [|// comment 1
////     // comment 2|]
////    this.method = function (param)[| {
////    }|]
////
////   [|// comment 1
////     // comment 2|]
////    function method(param)[| {
////    }|]
////}|]

verify.outliningSpansInCurrentFile(test.ranges());


