// @allowJs: true
// @outDir: out

// @filename: index.js
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
