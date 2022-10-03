class a {
    x: string;
}

class b extends a {
    static x() {
        return new b().x;
    }
}