type T1 = { x: string }

// An interface can be named in an extends or implements clause, but a type alias for an object type literal cannot.
interface I1 extends T1 { y: string }
class C1 implements T1 {
    x: string;
}

// An interface can have multiple merged declarations, but a type alias for an object type literal cannot.
type T2 = { x: string }
type T2 = { y: number }

// An interface can have type parameters, but a type alias for an object type literal cannot.
type T3<T> = { x: T }
