class foo<T>
{
    bar(): foo2<T[]> { return null; }
}
 
class foo2<T> extends foo<T> {
}
 
var test = new foo<string>();
