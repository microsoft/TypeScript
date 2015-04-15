class C {
    set X(x: number) { }
    get X() {
        return "string";  // Error; get contextual type by set accessor parameter type annotation
    }

    set Y(y) { }
    get Y() {
        return true;
    }

    set W(w) { }
    get W(): boolean {
        return true;
    }
}