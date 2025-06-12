//// [tests/cases/conformance/parser/ecmascript5/RegressionTests/parser509667.ts] ////

//// [parser509667.ts]
class Foo {
   f1() {
      if (this.
   }

   f2() {
   }

   f3() {
   }
}

//// [parser509667.js]
class Foo {
    f1() {
        if (this.
        )
            ;
    }
    f2() {
    }
    f3() {
    }
}
