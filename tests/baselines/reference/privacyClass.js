//// [tests/cases/compiler/privacyClass.ts] ////

//// [privacyClass.ts]
export module m1 {
    export interface m1_i_public {
    }

    interface m1_i_private {
    }

    export class m1_c_public {
        private f1() {
        }
    }

    class m1_c_private {
    }

    class m1_C1_private extends m1_c_public {
    }
    class m1_C2_private extends m1_c_private {
    }
    export class m1_C3_public extends m1_c_public {
    }
    export class m1_C4_public extends m1_c_private {
    }

    class m1_C5_private implements m1_i_public {
    }
    class m1_C6_private implements m1_i_private {
    }
    export class m1_C7_public implements m1_i_public {
    }
    export class m1_C8_public implements m1_i_private {
    }

    class m1_C9_private extends m1_c_public implements m1_i_private, m1_i_public {
    }
    class m1_C10_private extends m1_c_private implements  m1_i_private, m1_i_public {
    }
    export class m1_C11_public extends m1_c_public implements  m1_i_private, m1_i_public {
    }
    export class m1_C12_public extends m1_c_private implements  m1_i_private, m1_i_public {
    }
}


module m2 {
    export interface m2_i_public {
    }

    interface m2_i_private {
    }

    export class m2_c_public {
        private f1() {
        }
    }

    class m2_c_private {
    }

    class m2_C1_private extends m2_c_public {
    }
    class m2_C2_private extends m2_c_private {
    }
    export class m2_C3_public extends m2_c_public {
    }
    export class m2_C4_public extends m2_c_private {
    }

    class m2_C5_private implements m2_i_public {
    }
    class m2_C6_private implements m2_i_private {
    }
    export class m2_C7_public implements m2_i_public {
    }
    export class m2_C8_public implements m2_i_private {
    }

    class m2_C9_private extends m2_c_public implements m2_i_private, m2_i_public {
    }
    class m2_C10_private extends m2_c_private implements  m2_i_private, m2_i_public {
    }
    export class m2_C11_public extends m2_c_public implements  m2_i_private, m2_i_public {
    }
    export class m2_C12_public extends m2_c_private implements  m2_i_private, m2_i_public {
    }
}

export interface glo_i_public {
}

interface glo_i_private {
}

export class glo_c_public {
    private f1() {
    }
}

class glo_c_private {
}

class glo_C1_private extends glo_c_public {
}
class glo_C2_private extends glo_c_private {
}
export class glo_C3_public extends glo_c_public {
}
export class glo_C4_public extends glo_c_private {
}

class glo_C5_private implements glo_i_public {
}
class glo_C6_private implements glo_i_private {
}
export class glo_C7_public implements glo_i_public {
}
export class glo_C8_public implements glo_i_private {
}

class glo_C9_private extends glo_c_public implements glo_i_private, glo_i_public {
}
class glo_C10_private extends glo_c_private implements  glo_i_private, glo_i_public {
}
export class glo_C11_public extends glo_c_public implements  glo_i_private, glo_i_public {
}
export class glo_C12_public extends glo_c_private implements  glo_i_private, glo_i_public {
}

//// [privacyClass.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.glo_C12_public = exports.glo_C11_public = exports.glo_C8_public = exports.glo_C7_public = exports.glo_C4_public = exports.glo_C3_public = exports.glo_c_public = exports.m1 = void 0;
var m1;
(function (m1) {
    class m1_c_public {
        f1() {
        }
    }
    m1.m1_c_public = m1_c_public;
    class m1_c_private {
    }
    class m1_C1_private extends m1_c_public {
    }
    class m1_C2_private extends m1_c_private {
    }
    class m1_C3_public extends m1_c_public {
    }
    m1.m1_C3_public = m1_C3_public;
    class m1_C4_public extends m1_c_private {
    }
    m1.m1_C4_public = m1_C4_public;
    class m1_C5_private {
    }
    class m1_C6_private {
    }
    class m1_C7_public {
    }
    m1.m1_C7_public = m1_C7_public;
    class m1_C8_public {
    }
    m1.m1_C8_public = m1_C8_public;
    class m1_C9_private extends m1_c_public {
    }
    class m1_C10_private extends m1_c_private {
    }
    class m1_C11_public extends m1_c_public {
    }
    m1.m1_C11_public = m1_C11_public;
    class m1_C12_public extends m1_c_private {
    }
    m1.m1_C12_public = m1_C12_public;
})(m1 || (exports.m1 = m1 = {}));
var m2;
(function (m2) {
    class m2_c_public {
        f1() {
        }
    }
    m2.m2_c_public = m2_c_public;
    class m2_c_private {
    }
    class m2_C1_private extends m2_c_public {
    }
    class m2_C2_private extends m2_c_private {
    }
    class m2_C3_public extends m2_c_public {
    }
    m2.m2_C3_public = m2_C3_public;
    class m2_C4_public extends m2_c_private {
    }
    m2.m2_C4_public = m2_C4_public;
    class m2_C5_private {
    }
    class m2_C6_private {
    }
    class m2_C7_public {
    }
    m2.m2_C7_public = m2_C7_public;
    class m2_C8_public {
    }
    m2.m2_C8_public = m2_C8_public;
    class m2_C9_private extends m2_c_public {
    }
    class m2_C10_private extends m2_c_private {
    }
    class m2_C11_public extends m2_c_public {
    }
    m2.m2_C11_public = m2_C11_public;
    class m2_C12_public extends m2_c_private {
    }
    m2.m2_C12_public = m2_C12_public;
})(m2 || (m2 = {}));
class glo_c_public {
    f1() {
    }
}
exports.glo_c_public = glo_c_public;
class glo_c_private {
}
class glo_C1_private extends glo_c_public {
}
class glo_C2_private extends glo_c_private {
}
class glo_C3_public extends glo_c_public {
}
exports.glo_C3_public = glo_C3_public;
class glo_C4_public extends glo_c_private {
}
exports.glo_C4_public = glo_C4_public;
class glo_C5_private {
}
class glo_C6_private {
}
class glo_C7_public {
}
exports.glo_C7_public = glo_C7_public;
class glo_C8_public {
}
exports.glo_C8_public = glo_C8_public;
class glo_C9_private extends glo_c_public {
}
class glo_C10_private extends glo_c_private {
}
class glo_C11_public extends glo_c_public {
}
exports.glo_C11_public = glo_C11_public;
class glo_C12_public extends glo_c_private {
}
exports.glo_C12_public = glo_C12_public;
