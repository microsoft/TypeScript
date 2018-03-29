// @noEmit: true
// @strict: true
// @checkJs: true
// @allowJs: true
// @Filename: a.js
class Ex {
    foo() {
    }
}

class MyClass extends Ex {

}

// this override should be fine (even if it's a little odd)
MyClass.prototype.foo = function() {
}
