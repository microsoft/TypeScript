class a {
    static x() {
        return "20";
    }
}

class b extends a {
    static get x() {
        return "20";
    }
    static set x(aValue: string) {

    }
}