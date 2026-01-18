// All of these should be an error

namespace Y {
    public class A { s: string }

    public class BB<T> extends A {
        id: number;
    }
}

namespace Y2 {
    public class AA<T> { s: T }
    public interface I { id: number }

    public class B extends AA<string> implements I { id: number }
}

namespace Y3 {
    public namespace Module {
        class A { s: string }
    }
}

namespace Y4 {
    public enum Color { Blue, Red }
}

namespace YY {
    private class A { s: string }

    private class BB<T> extends A {
        id: number;
    }
}

namespace YY2 {
    private class AA<T> { s: T }
    private interface I { id: number }

    private class B extends AA<string> implements I { id: number }
}

namespace YY3 {
    private namespace Module {
        class A { s: string }
    }
}

namespace YY4 {
    private enum Color { Blue, Red }
}


namespace YYY {
    static class A { s: string }

    static class BB<T> extends A {
        id: number;
    }
}

namespace YYY2 {
    static class AA<T> { s: T }
    static interface I { id: number }

    static class B extends AA<string> implements I { id: number }
}

namespace YYY3 {
    static namespace Module {
        class A { s: string }
    }
}

namespace YYY4 {
    static enum Color { Blue, Red }
}
