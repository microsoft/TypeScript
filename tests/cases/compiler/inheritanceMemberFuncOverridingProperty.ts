// @target: es2015
// @strict: false
class a {
    x: () => string;
}

class b extends a {
    x() {
        return "20";
    }
}