class a {
    static get x() {
        return "20";
    }
    static set x(aValue: string) {

    }
}

class b extends a {
    static x() {
        return "20";
    }
}