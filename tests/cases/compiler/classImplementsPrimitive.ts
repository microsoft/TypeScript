// classes cannot implement primitives

class C implements number { }
class C2 implements string { }
class C3 implements boolean { }
class C4 implements Void  { }
class C4a implements void {}
class C5 implements Null { }
class C5a implements null { }
class C6 implements undefined { }
class C7 implements Undefined { }

enum E { A }
class C8 implements E { }

class C4a implements void {}
class C5a implements null { }