//// [tests/cases/compiler/thisInFunctionCall.ts] ////

//// [thisInFunctionCall.ts]
class Test {
  data: number[]

  constructor() {
    this.data = [1, 2, 3]
  }

  finderRaw() {
    this.data.find(function (d) {
      return d === this.data.length
    })
  }

  forEacherRaw() {
    this.data.forEach(function (d) {
      console.log(d === this.data.length)
    })
  }

  forEacher() {
    this.data.forEach(
    /** @this {Test} */
    function (d) {
      console.log(d === this.data.length)
    }, this)
  }

  finder() {
    this.data.find(
    /** @this {Test} */
    function (d) {
      return d === this.data.length
    }, this)
  }
}


//// [thisInFunctionCall.js]
class Test {
    constructor() {
        this.data = [1, 2, 3];
    }
    finderRaw() {
        this.data.find(function (d) {
            return d === this.data.length;
        });
    }
    forEacherRaw() {
        this.data.forEach(function (d) {
            console.log(d === this.data.length);
        });
    }
    forEacher() {
        this.data.forEach(
        /** @this {Test} */
        function (d) {
            console.log(d === this.data.length);
        }, this);
    }
    finder() {
        this.data.find(
        /** @this {Test} */
        function (d) {
            return d === this.data.length;
        }, this);
    }
}
