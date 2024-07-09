interface A<T> {
   x : T
}
 
interface B<T> extends A<B<B<B<T>>>> { }

interface C<T> extends A<C<C<C<T>>>> { }
 
var x : B<string>
var y : C<string> = x
