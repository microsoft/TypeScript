function f6<T>(x: (a: T) => T) {
    return null;
} 
f6(x => f6(y => x = y));