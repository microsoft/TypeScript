// All of these should be an error

module Y {
    public class A { s: string }

    public class BB<T> extends A {
        id: number;
    }
}

module Y2 {
    public class AA<T> { s: T }
    public interface I { id: number }

    public class B extends AA<string> implements I { id: number }
}

module Y3 {
    public module Module {
        class A { s: string }
    }
}

module Y4 {
    public enum Color { Blue, Red }
}

module YY {
    private class A { s: string }

    private class BB<T> extends A {
        id: number;
    }
}

module YY2 {
    private class AA<T> { s: T }
    private interface I { id: number }

    private class B extends AA<string> implements I { id: number }
}

module YY3 {
    private module Module {
        class A { s: string }
    }
}

module YY4 {
    private enum Color { Blue, Red }
}


module YYY {
    static class A { s: string }

    static class BB<T> extends A {
        id: number;
    }
}

module YYY2 {
    static class AA<T> { s: T }
    static interface I { id: number }

    static class B extends AA<string> implements I { id: number }
}

module YYY3 {
    static module Module {
        class A { s: string }
    }
}

module YYY4 {
    static enum Color { Blue, Red }
}
