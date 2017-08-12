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
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
function f(b) {
    var Foo;
    if (b) {
        Foo = (_a = (function () {
                function Foo() {
                }
                Foo.x = function () {
                    new Foo();
                };
                Foo.prototype.m = function () {
                    new Foo();
                };
                __names(Foo.prototype, ["m"]);
                return Foo;
            }()),
            _a.y = new _a(),
            _a);
        new Foo();
    }
    else {
        var Foo_1 = (function () {
            function Foo() {
            }
            Foo.x = function () {
                new Foo();
            };
            Foo.prototype.m = function () {
                new Foo();
            };
            __names(Foo.prototype, ["m"]);
            Foo.y = new Foo();
            return Foo;
        }());
        new Foo_1();
    }
    var _a;
}
