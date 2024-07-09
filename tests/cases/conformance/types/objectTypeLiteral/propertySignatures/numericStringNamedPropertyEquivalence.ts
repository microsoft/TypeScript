// Each of these types has an error in it. 
// String named and numeric named properties conflict if they would be equivalent after ToNumber on the property name.
class C {
    "1": number;
    "1.0": number; // not a duplicate
    1.0: number;
}

interface I {
    "1": number;
    "1.": number; // not a duplicate
    1: number;
}

var a: {
    "1": number;
    1.0: string;
}

var b = {
    "0": '',
    0: ''
}