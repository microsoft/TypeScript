// @strict: false
// @target: es5, es2015
class a {
    x() {
        return "20";
    }
}

class b extends a {
    get x() {
        return () => "20";
    }
    set x(aValue) {
        
    }
}