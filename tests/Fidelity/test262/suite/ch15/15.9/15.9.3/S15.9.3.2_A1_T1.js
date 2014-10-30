// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When Date is called as part of a new expression it is
 * a constructor: it initialises the newly created object
 *
 * @path ch15/15.9/15.9.3/S15.9.3.2_A1_T1.js
 * @description Checking types of newly created objects and it values
 */

$INCLUDE("Date_constants.js");
 
if (typeof new Date(date_1899_end) !== "object") {
  $FAIL("#1.1: typeof new Date(date_1899_end) === 'object'");
}

if (new Date(date_1899_end) === undefined) {
  $FAIL("#1.2: new Date(date_1899_end) === undefined");
}

var x13 = new Date(date_1899_end);
if(typeof x13 !== "object"){
  $FAIL("#1.3: typeof new Date(date_1899_end) !== 'object'");
}

var x14 = new Date(date_1899_end);
if(x14 === undefined){
  $FAIL("#1.4: new Date(date_1899_end) !== undefined");
}

if (typeof new Date(date_1900_start) !== "object") {
  $FAIL("#2.1: typeof new Date(date_1900_start) === 'object'");
}

if (new Date(date_1900_start) === undefined) {
  $FAIL("#2.2: new Date(date_1900_start) === undefined");
}

var x23 = new Date(date_1900_start);
if(typeof x23 !== "object"){
  $FAIL("#2.3: typeof new Date(date_1900_start) !== 'object'");
}

var x24 = new Date(date_1900_start);
if(x24 === undefined){
  $FAIL("#2.4: new Date(date_1900_start) !== undefined");
}

if (typeof new Date(date_1969_end) !== "object") {
  $FAIL("#3.1: typeof new Date(date_1969_end) === 'object'");
}

if (new Date(date_1969_end) === undefined) {
  $FAIL("#3.2: new Date(date_1969_end) === undefined");
}

var x33 = new Date(date_1969_end);
if(typeof x33 !== "object"){
  $FAIL("#3.3: typeof new Date(date_1969_end) !== 'object'");
}

var x34 = new Date(date_1969_end);
if(x34 === undefined){
  $FAIL("#3.4: new Date(date_1969_end) !== undefined");
}

if (typeof new Date(date_1970_start) !== "object") {
  $FAIL("#4.1: typeof new Date(date_1970_start) === 'object'");
}

if (new Date(date_1970_start) === undefined) {
  $FAIL("#4.2: new Date(date_1970_start) === undefined");
}

var x43 = new Date(date_1970_start);
if(typeof x43 !== "object"){
  $FAIL("#4.3: typeof new Date(date_1970_start) !== 'object'");
}

var x44 = new Date(date_1970_start);
if(x44 === undefined){
  $FAIL("#4.4: new Date(date_1970_start) !== undefined");
}

if (typeof new Date(date_1999_end) !== "object") {
  $FAIL("#5.1: typeof new Date(date_1999_end) === 'object'");
}

if (new Date(date_1999_end) === undefined) {
  $FAIL("#5.2: new Date(date_1999_end) === undefined");
}

var x53 = new Date(date_1999_end);
if(typeof x53 !== "object"){
  $FAIL("#5.3: typeof new Date(date_1999_end) !== 'object'");
}

var x54 = new Date(date_1999_end);
if(x54 === undefined){
  $FAIL("#5.4: new Date(date_1999_end) !== undefined");
}

if (typeof new Date(date_2000_start) !== "object") {
  $FAIL("#6.1: typeof new Date(date_2000_start) === 'object'");
}

if (new Date(date_2000_start) === undefined) {
  $FAIL("#6.2: new Date(date_2000_start) === undefined");
}

var x63 = new Date(date_2000_start);
if(typeof x63 !== "object"){
  $FAIL("#6.3: typeof new Date(date_2000_start) !== 'object'");
}

var x64 = new Date(date_2000_start);
if(x64 === undefined){
  $FAIL("#6.4: new Date(date_2000_start) !== undefined");
}

if (typeof new Date(date_2099_end) !== "object") {
  $FAIL("#7.1: typeof new Date(date_2099_end) === 'object'");
}

if (new Date(date_2099_end) === undefined) {
  $FAIL("#7.2: new Date(date_2099_end) === undefined");
}

var x73 = new Date(date_2099_end);
if(typeof x73 !== "object"){
  $FAIL("#7.3: typeof new Date(date_2099_end) !== 'object'");
}

var x74 = new Date(date_2099_end);
if(x74 === undefined){
  $FAIL("#7.4: new Date(date_2099_end) !== undefined");
}

if (typeof new Date(date_2100_start) !== "object") {
  $FAIL("#8.1: typeof new Date(date_2100_start) === 'object'");
}

if (new Date(date_2100_start) === undefined) {
  $FAIL("#8.2: new Date(date_2100_start) === undefined");
}

var x83 = new Date(date_2100_start);
if(typeof x83 !== "object"){
  $FAIL("#8.3: typeof new Date(date_2100_start) !== 'object'");
}

var x84 = new Date(date_2100_start);
if(x84 === undefined){
  $FAIL("#8.4: new Date(date_2100_start) !== undefined");
}

