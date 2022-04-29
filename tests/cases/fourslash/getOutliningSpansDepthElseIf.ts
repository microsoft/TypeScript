/// <reference path="fourslash.ts"/>

// Tests that each 'else if' does not count towards a higher nesting depth.

////if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else if (1)[| {
////    1;
////}|] else[| {
////    1;
////}|]

verify.outliningSpansInCurrentFile(test.ranges());
