// structes cannot extend primitives

struct C extends number { }
struct C2 extends string { }
struct C3 extends boolean { }
struct C4 extends Void  { }
struct C4a extends void {}
struct C5 extends Null { }
struct C5a extends null { }
struct C6 extends undefined { }
struct C7 extends Undefined { }

enum E { A }
struct C8 extends E { }