/// <reference path="fourslash.ts"/>

////[|/*
////    Block comment at the beginning of the file before module:
////        line one of the comment
////        line two of the comment
////        line three
////        line four
////        line five
////*/|]
////module Sayings[| {
////    [|/*
////    Comment before class:
////        line one of the comment
////        line two of the comment
////        line three
////        line four
////        line five
////    */|]
////    export class Greeter[| {
////        [|/*
////            Comment before a string identifier
////            line two of the comment
////        */|]
////        greeting: string;
////        [|/*
////            constructor
////            parameter message as a string
////        */|]
////        
////        [|/*
////            Multiple comments should be collapsed individually
////        */|]
////        constructor(message: string /* do not collapse this */)[| {
////            this.greeting = message;
////        }|]
////        [|/*
////            method of a class
////        */|]
////        greet()[| {
////            return "Hello, " + this.greeting;
////        }|]
////    }|]
////}|]
////
////[|/*
////    Block comment for interface. The ending can be on the same line as the declaration.
////*/|]interface IFoo[| {
////    [|/*
////    Multiple block comments
////    */|]
////
////    [|/*  
////    should be collapsed
////    */|]
////
////    [|/*
////    individually
////    */|]
////
////                                                                                                                              [|/*
////                                                                    this comment has trailing space before /* and after *-/ signs
////    */|]                                                                          
////
////    [|/**
////     *
////     *
////     *
////     */|]
////
////    [|/*
////    */|]
////
////    [|/*
////    */|]
////    // single line comments in the middle should not have an effect
////    [|/*
////    */|]
////
////    [|/*
////    */|]
////
////    [|/*
////    this block comment ends     
////    on the same line */|]  [|/* where the following comment starts
////        should be collapsed separately
////    */|]
////
////    getDist(): number;
////}|]
////
////var x =[|{
////  a:1,
////  b: 2,
////  [|/*
////        Over a function in an object literal
////  */|]
////  get foo()[| {
////    return 1;
////  }|]
////}|]
////
////// Over a function expression assigned to a variable
//// [|/**
////  * Return a sum
////  * @param {Number} y
////  * @param {Number} z
////  * @returns {Number} the sum of y and z
////  */|]
//// const sum2 = (y, z) =>[| {
////     return y + z;
//// }|];
////
////// Over a variable
////[|/**
//// * foo
//// */|]
////const foo = null;
////
////function Foo()[| {
////   [|/**
////     * Description
////     *
////     * @param {string} param
////     * @returns
////     */|]
////    this.method = function (param)[| {
////    }|]
////
////   [|/**
////     * Description
////     *
////     * @param {string} param
////     * @returns
////     */|]
////    function method(param)[| {
////    }|]
////}|]
////
////function fn1()[| {
////    [|/**
////     * comment
////     */|]
////}|]
////function fn2()[| {
////    [|/**
////     * comment
////     */|]
////
////    [|/**
////     * comment
////     */|]
////}|]
////function fn3()[| {
////    const x = 1;
////
////    [|/**
////     * comment
////     */|]
////
////    [|/**
////     * comment
////     */|]
////}|]
////function fn4()[| {
////    [|/**
////     * comment
////     */|]
////     const x = 1;
////
////    [|/**
////     * comment
////     */|]
////}|]
////function fn5()[| {
////    [|/**
////     * comment
////     */|]
////
////    [|/**
////     * comment
////     */|]
////     return 1;
////}|]
////function fn6()[| {
////    [|/**
////     * comment
////     */|]
////
////    [|/**
////     * comment
////     */|]
////    const x = 1;
////}|]
////class C1[| {
////    [|/**
////     * comment
////     */|]
////
////    [|/**
////     * comment
////     */|]
////}|]
////class C2[| {
////    private prop = 1;
////    [|/**
////     * comment
////     */|]
////
////    [|/**
////     * comment
////     */|]
////}|]
////class C3[| {
////    [|/**
////     * comment
////     */|]
////
////    private prop = 1;
////    [|/**
////     * comment
////     */|]
////}|]
////class C4[| {
////    [|/**
////     * comment
////     */|]
////
////    [|/**
////     * comment
////     */|]
////    private prop = 1;
////}|]
////module M1[| {
////    [|/**
////     * comment
////     */|]
////
////    [|/**
////     * comment
////     */|]
////}|]
////module M2[| {
////    export const a = 1;
////    [|/**
////     * comment
////     */|]
////
////    [|/**
////     * comment
////     */|]
////}|]
////module M3[| {
////    [|/**
////     * comment
////     */|]
////    export const a = 1;
////
////    [|/**
////     * comment
////     */|]
////}|]
////module M4[| {
////    [|/**
////     * comment
////     */|]
////
////    [|/**
////     * comment
////     */|]
////    export const a = 1;
////}|]
////interface I1[| {
////    [|/**
////     * comment
////     */|]
////
////    [|/**
////     * comment
////     */|]
////}|]
////interface I2[| {
////    x: number;
////    [|/**
////     * comment
////     */|]
////
////    [|/**
////     * comment
////     */|]
////}|]
////interface I3[| {
////    [|/**
////     * comment
////     */|]
////    x: number;
////
////    [|/**
////     * comment
////     */|]
////}|]
////interface I4[| {
////    [|/**
////     * comment
////     */|]
////
////    [|/**
////     * comment
////     */|]
////    x: number;
////}|]
////[|{
////    [|/**
////     * comment
////     */|]
////
////    [|/**
////     * comment
////     */|]
////}|]

verify.outliningSpansInCurrentFile(test.ranges());
