/// <reference path='fourslash.ts'/>

// @allowJs: true
// @checkJs: true

// @filename: /a.js
//// /**
////  * @template T
////  */
//// class Collection {}
////
//// /**
////  * @typedef {object} U/*1*/serData
////  * @property {string} id
////  * @property {string} name
////  */
////
//// /** @specialize <UserData> */
//// const users = new Collection('users');

verify.baselineFindAllReferences('1');
