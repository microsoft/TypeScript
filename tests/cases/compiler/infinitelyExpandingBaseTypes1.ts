interface A<T>
{
    x : A<A<T>>
}
 
interface B<T>
{
    x : B<T>
}
 
interface C<T> extends A<T>, B<T> { }

 
