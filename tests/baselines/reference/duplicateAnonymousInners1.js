//// [duplicateAnonymousInners1.ts]
module Foo {

    class Helper {

    }
    
    class Inner {}
    // Inner should show up in Intellisense
    
    export var Outer=0;
}


module Foo {
    
    // Should not be an error
    class Helper {

    }
    
    // Inner should not show up in Intellisense
    // Outer should show up in Intellisense

}


//// [duplicateAnonymousInners1.js]
var Foo;
(function (Foo) {
    var Helper = (function () {
        function Helper() {
        }
        return Helper;
    }());
    var Inner = (function () {
        function Inner() {
        }
        return Inner;
    }());
    // Inner should show up in Intellisense
    Foo.Outer = 0;
})(Foo || (Foo = {}));
var Foo;
(function (Foo) {
    // Should not be an error
    var Helper = (function () {
        function Helper() {
        }
        return Helper;
    }());
})(Foo || (Foo = {}));
