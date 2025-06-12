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
    var _a;
    let Foo;
    if (b) {
        Foo = (_a = class Foo {
                static x() {
                    new _a();
                }
                m() {
                    new _a();
                }
            },
            _a.y = new _a(),
            _a);
        new Foo();
    }
    else {
        let Foo = (() => {
            class Foo {
                static x() {
                    new Foo();
                }
                m() {
                    new Foo();
                }
            }
            Foo.y = new Foo();
            return Foo;
        })();
        new Foo();
    }
}
