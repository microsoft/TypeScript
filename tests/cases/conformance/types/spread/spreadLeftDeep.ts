function f<T,U,V,W>(t: T, u: U, v: V, w: W) {
    // right-deep structure (T (U (V W)) should get transformed to
    // left-deep structure (((T U) V) W)
    let x: spread(T, spread(U, spread(V, W)));
    return x;
}
