//@noUnusedLocals:true
//@noUnusedParameters:true

// clas + interface
class C1<T> { }
interface C1<T> { a: T; }

// interface + class
class C2<T> { a: T; }
interface C2<T> { }

// interfaces
interface C3<T> { a(c: (p: T) => void): void; }
interface C3<T> { b: string; }
interface C3<T> { c: number; }
interface C3<T> { d: boolean;  }
interface C3<T> { e: any; }