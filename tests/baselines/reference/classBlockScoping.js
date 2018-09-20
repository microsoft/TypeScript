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
    var Foo;
    if (b) {
        Foo = (_a = /** @class */ (function () {
                function Foo() {
                }
                Foo.x = function () {
                    new Foo();
                };
                Foo.prototype.m = function () {
                    new Foo();
                };
                return Foo;
            }()),
            _a.y = new _a(),
            _a);
        new Foo();
    }
    else {
        var Foo_1 = /** @class */ (function () {
            function Foo() {
            }
            Foo.x = function () {
                new Foo();
            };
            Foo.prototype.m = function () {
                new Foo();
            };
            Foo.y = new Foo();
            return Foo;
        }());
        new Foo_1();
    }
}
