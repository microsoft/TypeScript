module M {
    export module N {
    }
    export import X = N;
}

import r = M.X;