class Base2 {
    private static y: { foo: string };
}
 
class Derived2 extends Base2 {
    private static y: { foo: string; bar: string; };
}