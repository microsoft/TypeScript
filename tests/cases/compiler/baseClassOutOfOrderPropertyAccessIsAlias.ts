module M {
    export module Q {
        export class C {
        }
    }

    export class C {
    }
    export import im = Q.C;
}

import im4 = M;

class B1 extends im1.C { // error
}
class B2 extends im1.Q.C { // error
}
class B3 extends im2.C { // error
}
class B4 extends im3 { // error
}
class B5 extends im1.im { // error
}
class B6 extends im4.im { // no error
}
class B7 extends im4.C { // no error
}
class B8 extends im4.Q.C { // no error
}
class B9 extends M.C { // no error
}
class B10 extends M.Q.C { // no error
}
class B11 extends M.im { // no error
}

import im1 = M;
import im2 = M.Q;
import im3 = M.Q.C;