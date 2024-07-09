// @allowJs: true
// @noEmit: true

// @filename: foo.js
export class StackOverflowTest {
  constructor () {
    this.testStackOverflow = this.testStackOverflow.bind(this)
  }
}
