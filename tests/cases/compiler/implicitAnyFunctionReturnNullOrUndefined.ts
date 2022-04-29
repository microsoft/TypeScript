//@noimplicitany: true
// this should be an error
function nullWidenFunction() { return null;}             // error at "nullWidenFunction"
function undefinedWidenFunction() { return undefined; }  // error at "undefinedWidenFunction"

class C {
    nullWidenFuncOfC() {  // error at "nullWidenFuncOfC"
        return null;
    }

    underfinedWidenFuncOfC() {  // error at "underfinedWidenFuncOfC"
        return undefined;
    }
}

// this should not be an error
function foo1(): any { return null; }
function bar1(): any { return undefined; }
function fooBar(): number { return 1; }
function fooFoo() { return 5; }

// this should not be an error as the error is raised by expr above
nullWidenFunction();
undefinedWidenFunction();
