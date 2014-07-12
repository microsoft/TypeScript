//// [localImportNameVsGlobalName.ts]
module Keyboard {
  export enum Key { UP, DOWN, LEFT, RIGHT }
}

module App {
  import Key = Keyboard.Key;

  export function foo(key: Key): void {}

  foo(Key.UP);
  foo(Key.DOWN);
  foo(Key.LEFT);
}

//// [localImportNameVsGlobalName.js]
var Keyboard;
(function (Keyboard) {
    (function (Key) {
        Key[Key["UP"] = 0] = "UP";
        Key[Key["DOWN"] = 1] = "DOWN";
        Key[Key["LEFT"] = 2] = "LEFT";
        Key[Key["RIGHT"] = 3] = "RIGHT";
    })(Keyboard.Key || (Keyboard.Key = {}));
    var Key = Keyboard.Key;
})(Keyboard || (Keyboard = {}));

var App;
(function (App) {
    var Key = Keyboard.Key;

    function foo(key) {
    }
    App.foo = foo;

    foo(0 /* UP */);
    foo(1 /* DOWN */);
    foo(2 /* LEFT */);
})(App || (App = {}));
