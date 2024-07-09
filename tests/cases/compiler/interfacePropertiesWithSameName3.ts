interface D { a: number; }
interface E { a: string; }
interface F extends E, D { } // error

class D2 { a: number; }
class E2 { a: string; }
interface F2 extends E2, D2 { } // error
