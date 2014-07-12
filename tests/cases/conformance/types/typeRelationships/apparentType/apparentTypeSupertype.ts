// subtype checks use the apparent type of the target type
// S is a subtype of a type T, and T is a supertype of S, if one of the following is true, where S' denotes the apparent type (section 3.8.1) of S:

class Base {
    x: string;
}

// is String (S) a subtype of U extends String (T)? Would only be true if we used the apparent type of U (T)
class Derived<U extends String> extends Base { // error
    x: U;
}