// @allowJs: true
// @checkJs: true
// @noEmit: true
// @esModuleInterop: true
// @filename: mod1.js
class Alias {
    bar() { return 1 }
}
module.exports = Alias;

// @filename: main.js
import A from './mod1'
A.prototype.foo = 0
A.prototype.func = function() { this._func = 0; }
Object.defineProperty(A.prototype, "def", { value: 0 });
new A().bar
new A().foo
new A().func()
new A().def
