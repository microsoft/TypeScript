module M {
    export class c {
    }
}

import im2 = M.c;

class B extends im { //error
}

class C extends im2 { // no error
}

import im = M.c;