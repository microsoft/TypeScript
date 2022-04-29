
interface I1<T> {

  m1<U>(callback: (p: T) => U): I1<U>;

}
 
var v1: I1<boolean>;
 
var v2: I1<number> = v1;