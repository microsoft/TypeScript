//// [tests/cases/compiler/classBlockScoping.ts] ////

//// [classBlockScoping.ts]
function f(b: boolean) {
  let Foo: any;
  if (b) {
    Foo = class Foo {
      static y = new Foo();

      static x() {
        new Foo();
      }

      m() {
        new Foo();
      }
    };

    new Foo();
  }
  else {
    class Foo {
      static y = new Foo();

      static x() {
        new Foo();
      }

      m() {
        new Foo();
      }
    }

    new Foo();
  }
}

//// [classBlockScoping.js]
function f(b) {
    let Foo;
    if (b) {
        Foo = class Foo {
            static y = new Foo();
            static x() {
                new Foo();
            }
            m() {
                new Foo();
            }
        };
        new Foo();
    }
    else {
        class Foo {
            static y = new Foo();
            static x() {
                new Foo();
            }
            m() {
                new Foo();
            }
        }
        new Foo();
    }
}
