//// [tests/cases/compiler/thisInObjectJs.ts] ////

//// [index.js]
export { }
let obj = {
  x: 10,
  y: [1],
  fun: function() {
    this.x = 1
    this/*1*/
  },
  f2: function() {
    this.x
    this/*2*/
  },
  f3: (function() {
    this.x = 1
    this/*3*/
  }),
}


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var obj = {
    x: 10,
    y: [1],
    fun: function () {
        this.x = 1;
        this; /*1*/
    },
    f2: function () {
        this.x;
        this; /*2*/
    },
    f3: (function () {
        this.x = 1;
        this; /*3*/
    }),
};
