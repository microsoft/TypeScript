class A1<T> {
static B<S>(v: A1<S>): A1<S>; // 1 
static B<S>(v: S): A1<S>; // 2 : Error Duplicate signature
static B<S>(v: any): A1<S> {
return null;
}
}
