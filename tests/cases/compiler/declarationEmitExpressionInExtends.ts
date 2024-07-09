// @declaration: true

var x: {
    new<T>(s: any): Q;
}

class Q {
    s: string;    
}

class B extends x<string> {    
}

var q: B;
q.s;