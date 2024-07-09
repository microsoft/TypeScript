// type parameters cannot be used as base types
// these are all errors

class C<T> extends T { }
class C2<T, U> extends U { }

interface I<T> extends T { }
interface I2<T, U> extends U { }

