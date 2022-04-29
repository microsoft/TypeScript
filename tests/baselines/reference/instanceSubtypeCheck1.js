//// [instanceSubtypeCheck1.ts]
interface A<T>
{
   x: A<B<T>>
}
 
interface B<T> extends A<T>
{
   x: B<A<T>>
}

//// [instanceSubtypeCheck1.js]
