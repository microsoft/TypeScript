interface Stack<T> {
      pop(): T
      zip<S>(a: Stack<S>): Stack<{ x: T; y: S }>
}

interface MyStack<T> extends Stack<T> {
      zip<S>(a: Stack<S>): Stack<{ x: T; y: S }>
}
