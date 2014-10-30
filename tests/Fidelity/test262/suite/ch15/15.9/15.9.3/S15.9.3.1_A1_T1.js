// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When Date is called as part of a new expression it is
 * a constructor: it initializes the newly created object
 *
 * @path ch15/15.9/15.9.3/S15.9.3.1_A1_T1.js
 * @description 2 arguments, (year, month)
 */

if (typeof new Date(1899, 11) !== "object") {
  $FAIL("#1.1: typeof new Date(1899, 11) should be 'object'");
}

if (new Date(1899, 11) === undefined) {
  $FAIL("#1.2: new Date(1899, 11) should not be undefined");
}

var x13 = new Date(1899, 11);
if(typeof x13 !== "object"){
  $FAIL("#1.3: typeof new Date(1899, 11) should be 'object'");
}

var x14 = new Date(1899, 11);
if(x14 === undefined){
  $FAIL("#1.4: new Date(1899, 11) should not be undefined");
}

if (typeof new Date(1899, 12) !== "object") {
  $FAIL("#2.1: typeof new Date(1899, 12) should be 'object'");
}

if (new Date(1899, 12) === undefined) {
  $FAIL("#2.2: new Date(1899, 12) should not be undefined");
}

var x23 = new Date(1899, 12);
if(typeof x23 !== "object"){
  $FAIL("#2.3: typeof new Date(1899, 12) should be 'object'");
}

var x24 = new Date(1899, 12);
if(x24 === undefined){
  $FAIL("#2.4: new Date(1899, 12) should not be undefined");
}

if (typeof new Date(1900, 0) !== "object") {
  $FAIL("#3.1: typeof new Date(1900, 0) should be 'object'");
}

if (new Date(1900, 0) === undefined) {
  $FAIL("#3.2: new Date(1900, 0) should not be undefined");
}

var x33 = new Date(1900, 0);
if(typeof x33 !== "object"){
  $FAIL("#3.3: typeof new Date(1900, 0) should be 'object'");
}

var x34 = new Date(1900, 0);
if(x34 === undefined){
  $FAIL("#3.4: new Date(1900, 0) should not be undefined");
}

if (typeof new Date(1969, 11) !== "object") {
  $FAIL("#4.1: typeof new Date(1969, 11) should be 'object'");
}

if (new Date(1969, 11) === undefined) {
  $FAIL("#4.2: new Date(1969, 11) should not be undefined");
}

var x43 = new Date(1969, 11);
if(typeof x43 !== "object"){
  $FAIL("#4.3: typeof new Date(1969, 11) should be 'object'");
}

var x44 = new Date(1969, 11);
if(x44 === undefined){
  $FAIL("#4.4: new Date(1969, 11) should not be undefined");
}

if (typeof new Date(1969, 12) !== "object") {
  $FAIL("#5.1: typeof new Date(1969, 12) should be 'object'");
}

if (new Date(1969, 12) === undefined) {
  $FAIL("#5.2: new Date(1969, 12) should not be undefined");
}

var x53 = new Date(1969, 12);
if(typeof x53 !== "object"){
  $FAIL("#5.3: typeof new Date(1969, 12) should be 'object'");
}

var x54 = new Date(1969, 12);
if(x54 === undefined){
  $FAIL("#5.4: new Date(1969, 12) should not be undefined");
}

if (typeof new Date(1970, 0) !== "object") {
  $FAIL("#6.1: typeof new Date(1970, 0) should be 'object'");
}

if (new Date(1970, 0) === undefined) {
  $FAIL("#6.2: new Date(1970, 0) should not be undefined");
}

var x63 = new Date(1970, 0);
if(typeof x63 !== "object"){
  $FAIL("#6.3: typeof new Date(1970, 0) should be 'object'");
}

var x64 = new Date(1970, 0);
if(x64 === undefined){
  $FAIL("#6.4: new Date(1970, 0) should not be undefined");
}

if (typeof new Date(1999, 11) !== "object") {
  $FAIL("#7.1: typeof new Date(1999, 11) should be 'object'");
}

if (new Date(1999, 11) === undefined) {
  $FAIL("#7.2: new Date(1999, 11) should not be undefined");
}

var x73 = new Date(1999, 11);
if(typeof x73 !== "object"){
  $FAIL("#7.3: typeof new Date(1999, 11) should be 'object'");
}

var x74 = new Date(1999, 11);
if(x74 === undefined){
  $FAIL("#7.4: new Date(1999, 11) should not be undefined");
}

if (typeof new Date(1999, 12) !== "object") {
  $FAIL("#8.1: typeof new Date(1999, 12) should be 'object'");
}

if (new Date(1999, 12) === undefined) {
  $FAIL("#8.2: new Date(1999, 12) should not be undefined");
}

var x83 = new Date(1999, 12);
if(typeof x83 !== "object"){
  $FAIL("#8.3: typeof new Date(1999, 12) should be 'object'");
}

var x84 = new Date(1999, 12);
if(x84 === undefined){
  $FAIL("#8.4: new Date(1999, 12) should not be undefined");
}

if (typeof new Date(2000, 0) !== "object") {
  $FAIL("#9.1: typeof new Date(2000, 0) should be 'object'");
}

if (new Date(2000, 0) === undefined) {
  $FAIL("#9.2: new Date(2000, 0) should not be undefined");
}

var x93 = new Date(2000, 0);
if(typeof x93 !== "object"){
  $FAIL("#9.3: typeof new Date(2000, 0) should be 'object'");
}

var x94 = new Date(2000, 0);
if(x94 === undefined){
  $FAIL("#9.4: new Date(2000, 0) should not be undefined");
}

if (typeof new Date(2099, 11) !== "object") {
  $FAIL("#10.1: typeof new Date(2099, 11) should be 'object'");
}

if (new Date(2099, 11) === undefined) {
  $FAIL("#10.2: new Date(2099, 11) should not be undefined");
}

var x103 = new Date(2099, 11);
if(typeof x103 !== "object"){
  $FAIL("#10.3: typeof new Date(2099, 11) should be 'object'");
}

var x104 = new Date(2099, 11);
if(x104 === undefined){
  $FAIL("#10.4: new Date(2099, 11) should not be undefined");
}

if (typeof new Date(2099, 12) !== "object") {
  $FAIL("#11.1: typeof new Date(2099, 12) should be 'object'");
}

if (new Date(2099, 12) === undefined) {
  $FAIL("#11.2: new Date(2099, 12) should not be undefined");
}

var x113 = new Date(2099, 12);
if(typeof x113 !== "object"){
  $FAIL("#11.3: typeof new Date(2099, 12) should be 'object'");
}

var x114 = new Date(2099, 12);
if(x114 === undefined){
  $FAIL("#11.4: new Date(2099, 12) should not be undefined");
}

if (typeof new Date(2100, 0) !== "object") {
  $FAIL("#12.1: typeof new Date(2100, 0) should be 'object'");
}

if (new Date(2100, 0) === undefined) {
  $FAIL("#12.2: new Date(2100, 0) should not be undefined");
}

var x123 = new Date(2100, 0);
if(typeof x123 !== "object"){
  $FAIL("#12.3: typeof new Date(2100, 0) should be 'object'");
}

var x124 = new Date(2100, 0);
if(x124 === undefined){
  $FAIL("#12.4: new Date(2100, 0) should not be undefined");
}

