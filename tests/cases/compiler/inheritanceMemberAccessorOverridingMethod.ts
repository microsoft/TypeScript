// @target: es5
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