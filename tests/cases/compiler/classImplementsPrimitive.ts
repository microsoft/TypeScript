// classes cannot implement primitives

class C implements number { }
class C2 implements string { }
class C3 implements boolean { }

const C4 = class implements number {}
const C5 = class implements string {}
const C6 = class implements boolean {}

const C7 = class A implements number { }
const C8 = class B implements string { }
const C9 = class C implements boolean { }
