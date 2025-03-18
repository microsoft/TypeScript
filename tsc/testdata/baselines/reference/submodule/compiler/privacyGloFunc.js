//// [tests/cases/compiler/privacyGloFunc.ts] ////

//// [privacyGloFunc.ts]
export module m1 {
    export class C1_public {
        private f1() {
        }
    }

    class C2_private {
    }

    export class C3_public {
        constructor (m1_c3_c1: C1_public);
        constructor (m1_c3_c2: C2_private); //error
        constructor (m1_c3_c1_2: any) {
        }

        private f1_private(m1_c3_f1_arg: C1_public) {
        }

        public f2_public(m1_c3_f2_arg: C1_public) {
        }

        private f3_private(m1_c3_f3_arg: C2_private) {
        }

        public f4_public(m1_c3_f4_arg: C2_private) { // error
        }

        private f5_private() {
            return new C1_public();
        }

        public f6_public() {
            return new C1_public();
        }

        private f7_private() {
            return new C2_private();
        }

        public f8_public() {
            return new C2_private();  // error
        }

        private f9_private(): C1_public {
            return new C1_public();
        }

        public f10_public(): C1_public {
            return new C1_public();
        }

        private f11_private(): C2_private {
            return new C2_private();
        }

        public f12_public(): C2_private { // error
            return new C2_private(); //error
        }
    }

    class C4_private {
        constructor (m1_c4_c1: C1_public);
        constructor (m1_c4_c2: C2_private);
        constructor (m1_c4_c1_2: any) {
        }
        private f1_private(m1_c4_f1_arg: C1_public) {
        }

        public f2_public(m1_c4_f2_arg: C1_public) {
        }

        private f3_private(m1_c4_f3_arg: C2_private) {
        }

        public f4_public(m1_c4_f4_arg: C2_private) {
        }


        private f5_private() {
            return new C1_public();
        }

        public f6_public() {
            return new C1_public();
        }

        private f7_private() {
            return new C2_private();
        }

        public f8_public() {
            return new C2_private();
        }


        private f9_private(): C1_public {
            return new C1_public();
        }

        public f10_public(): C1_public {
            return new C1_public();
        }

        private f11_private(): C2_private {
            return new C2_private();
        }

        public f12_public(): C2_private {
            return new C2_private();
        }
    }

    export class C5_public {
        constructor (m1_c5_c: C1_public) {
        }
    }
    
    class C6_private {
        constructor (m1_c6_c: C1_public) {
        }
    }
    export class C7_public {
        constructor (m1_c7_c: C2_private) { // error
        }
    }
    
    class C8_private {
        constructor (m1_c8_c: C2_private) {
        }
    }

    function f1_public(m1_f1_arg: C1_public) {
    }

    export function f2_public(m1_f2_arg: C1_public) {
    }

    function f3_public(m1_f3_arg: C2_private) {
    }

    export function f4_public(m1_f4_arg: C2_private) { // error
    }


    function f5_public() {
        return new C1_public();
    }

    export function f6_public() {
        return new C1_public();
    }

    function f7_public() {
        return new C2_private();
    }

    export function f8_public() {
        return new C2_private();  // error
    }


    function f9_private(): C1_public {
        return new C1_public();
    }

    export function f10_public(): C1_public {
        return new C1_public();
    }

    function f11_private(): C2_private {
        return new C2_private();
    }

    export function f12_public(): C2_private { // error
        return new C2_private(); //error
    }
}

module m2 {
    export class m2_C1_public {
        private f() {
        }
    }

    class m2_C2_private {
    }

    export class m2_C3_public {
        constructor (m2_c3_c1: m2_C1_public);
        constructor (m2_c3_c2: m2_C2_private);
        constructor (m2_c3_c1_2: any) {
        }

        private f1_private(m2_c3_f1_arg: m2_C1_public) {
        }

        public f2_public(m2_c3_f2_arg: m2_C1_public) {
        }

        private f3_private(m2_c3_f3_arg: m2_C2_private) {
        }

        public f4_public(m2_c3_f4_arg: m2_C2_private) {
        }

        private f5_private() {
            return new m2_C1_public();
        }

        public f6_public() {
            return new m2_C1_public();
        }

        private f7_private() {
            return new m2_C2_private();
        }

        public f8_public() {
            return new m2_C2_private();
        }

        private f9_private(): m2_C1_public {
            return new m2_C1_public();
        }

        public f10_public(): m2_C1_public {
            return new m2_C1_public();
        }

        private f11_private(): m2_C2_private {
            return new m2_C2_private();
        }

        public f12_public(): m2_C2_private {
            return new m2_C2_private();
        }
    }

    class m2_C4_private {
        constructor (m2_c4_c1: m2_C1_public);
        constructor (m2_c4_c2: m2_C2_private);
        constructor (m2_c4_c1_2: any) {
        }

        private f1_private(m2_c4_f1_arg: m2_C1_public) {
        }

        public f2_public(m2_c4_f2_arg: m2_C1_public) {
        }

        private f3_private(m2_c4_f3_arg: m2_C2_private) {
        }

        public f4_public(m2_c4_f4_arg: m2_C2_private) {
        }


        private f5_private() {
            return new m2_C1_public();
        }

        public f6_public() {
            return new m2_C1_public();
        }

        private f7_private() {
            return new m2_C2_private();
        }

        public f8_public() {
            return new m2_C2_private();
        }


        private f9_private(): m2_C1_public {
            return new m2_C1_public();
        }

        public f10_public(): m2_C1_public {
            return new m2_C1_public();
        }

        private f11_private(): m2_C2_private {
            return new m2_C2_private();
        }

        public f12_public(): m2_C2_private {
            return new m2_C2_private();
        }
    }

    export class m2_C5_public {
        constructor (m2_c5_c: m2_C1_public) {
        }
    }
    
    class m2_C6_private {
        constructor (m2_c6_c: m2_C1_public) {
        }
    }
    export class m2_C7_public {
        constructor (m2_c7_c: m2_C2_private) { 
        }
    }
    
    class m2_C8_private {
        constructor (m2_c8_c: m2_C2_private) {
        }
    }

    function f1_public(m2_f1_arg: m2_C1_public) {
    }

    export function f2_public(m2_f2_arg: m2_C1_public) {
    }

    function f3_public(m2_f3_arg: m2_C2_private) {
    }

    export function f4_public(m2_f4_arg: m2_C2_private) {
    }


    function f5_public() {
        return new m2_C1_public();
    }

    export function f6_public() {
        return new m2_C1_public();
    }

    function f7_public() {
        return new m2_C2_private();
    }

    export function f8_public() {
        return new m2_C2_private();
    }


    function f9_private(): m2_C1_public {
        return new m2_C1_public();
    }

    export function f10_public(): m2_C1_public {
        return new m2_C1_public();
    }

    function f11_private(): m2_C2_private {
        return new m2_C2_private();
    }

    export function f12_public(): m2_C2_private {
        return new m2_C2_private();
    }
}

class C5_private {
    private f() {
    }
}

export class C6_public {
}

export class C7_public {
    constructor (c7_c1: C5_private); // error
    constructor (c7_c2: C6_public);
    constructor (c7_c1_2: any) {
    }
    private f1_private(c7_f1_arg: C6_public) {
    }

    public f2_public(c7_f2_arg: C6_public) {
    }

    private f3_private(c7_f3_arg: C5_private) {
    }

    public f4_public(c7_f4_arg: C5_private) { //error
    }

    private f5_private() {
        return new C6_public();
    }

    public f6_public() {
        return new C6_public();
    }

    private f7_private() {
        return new C5_private();
    }

    public f8_public() {
        return new C5_private(); //error
    }

    private f9_private(): C6_public {
        return new C6_public();
    }

    public f10_public(): C6_public {
        return new C6_public();
    }

    private f11_private(): C5_private {
        return new C5_private();
    }

    public f12_public(): C5_private { //error
        return new C5_private(); //error
    }
}

class C8_private {
    constructor (c8_c1: C5_private);
    constructor (c8_c2: C6_public);
    constructor (c8_c1_2: any) {
    }
        
    private f1_private(c8_f1_arg: C6_public) {
    }

    public f2_public(c8_f2_arg: C6_public) {
    }

    private f3_private(c8_f3_arg: C5_private) {
    }

    public f4_public(c8_f4_arg: C5_private) {
    }

    private f5_private() {
        return new C6_public();
    }

    public f6_public() {
        return new C6_public();
    }

    private f7_private() {
        return new C5_private();
    }

    public f8_public() {
        return new C5_private();
    }

    private f9_private(): C6_public {
        return new C6_public();
    }

    public f10_public(): C6_public {
        return new C6_public();
    }

    private f11_private(): C5_private {
        return new C5_private();
    }

    public f12_public(): C5_private {
        return new C5_private();
    }
}


export class C9_public {
    constructor (c9_c: C6_public) {
    }
}
    
class C10_private {
    constructor (c10_c: C6_public) {
    }
}
export class C11_public {
    constructor (c11_c: C5_private) { // error
    }
}
    
class C12_private {
    constructor (c12_c: C5_private) {
    }
}

function f1_private(f1_arg: C5_private) {
}

export function f2_public(f2_arg: C5_private) { // error
}

function f3_private(f3_arg: C6_public) {
}

export function f4_public(f4_arg: C6_public) {
}

function f5_private() {
    return new C6_public();
}

export function f6_public() {
    return new C6_public();
}

function f7_private() {
    return new C5_private();
}

export function f8_public() {
    return new C5_private(); //error
}

function f9_private(): C6_public {
    return new C6_public();
}

export function f10_public(): C6_public {
    return new C6_public();
}

function f11_private(): C5_private {
    return new C5_private();
}

export function f12_public(): C5_private { //error 
    return new C5_private(); //error
}


//// [privacyGloFunc.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.C11_public = exports.C9_public = exports.C7_public = exports.C6_public = exports.m1 = void 0;
exports.f2_public = f2_public;
exports.f4_public = f4_public;
exports.f6_public = f6_public;
exports.f8_public = f8_public;
exports.f10_public = f10_public;
exports.f12_public = f12_public;
var m1;
(function (m1) {
    class C1_public {
        f1() {
        }
    }
    m1.C1_public = C1_public;
    class C2_private {
    }
    class C3_public {
        constructor(m1_c3_c1_2) {
        }
        f1_private(m1_c3_f1_arg) {
        }
        f2_public(m1_c3_f2_arg) {
        }
        f3_private(m1_c3_f3_arg) {
        }
        f4_public(m1_c3_f4_arg) {
        }
        f5_private() {
            return new C1_public();
        }
        f6_public() {
            return new C1_public();
        }
        f7_private() {
            return new C2_private();
        }
        f8_public() {
            return new C2_private();
        }
        f9_private() {
            return new C1_public();
        }
        f10_public() {
            return new C1_public();
        }
        f11_private() {
            return new C2_private();
        }
        f12_public() {
            return new C2_private();
        }
    }
    m1.C3_public = C3_public;
    class C4_private {
        constructor(m1_c4_c1_2) {
        }
        f1_private(m1_c4_f1_arg) {
        }
        f2_public(m1_c4_f2_arg) {
        }
        f3_private(m1_c4_f3_arg) {
        }
        f4_public(m1_c4_f4_arg) {
        }
        f5_private() {
            return new C1_public();
        }
        f6_public() {
            return new C1_public();
        }
        f7_private() {
            return new C2_private();
        }
        f8_public() {
            return new C2_private();
        }
        f9_private() {
            return new C1_public();
        }
        f10_public() {
            return new C1_public();
        }
        f11_private() {
            return new C2_private();
        }
        f12_public() {
            return new C2_private();
        }
    }
    class C5_public {
        constructor(m1_c5_c) {
        }
    }
    m1.C5_public = C5_public;
    class C6_private {
        constructor(m1_c6_c) {
        }
    }
    class C7_public {
        constructor(m1_c7_c) {
        }
    }
    m1.C7_public = C7_public;
    class C8_private {
        constructor(m1_c8_c) {
        }
    }
    function f1_public(m1_f1_arg) {
    }
    function f2_public(m1_f2_arg) {
    }
    m1.f2_public = f2_public;
    function f3_public(m1_f3_arg) {
    }
    function f4_public(m1_f4_arg) {
    }
    m1.f4_public = f4_public;
    function f5_public() {
        return new C1_public();
    }
    function f6_public() {
        return new C1_public();
    }
    m1.f6_public = f6_public;
    function f7_public() {
        return new C2_private();
    }
    function f8_public() {
        return new C2_private();
    }
    m1.f8_public = f8_public;
    function f9_private() {
        return new C1_public();
    }
    function f10_public() {
        return new C1_public();
    }
    m1.f10_public = f10_public;
    function f11_private() {
        return new C2_private();
    }
    function f12_public() {
        return new C2_private();
    }
    m1.f12_public = f12_public;
})(m1 || (exports.m1 = m1 = {}));
var m2;
(function (m2) {
    class m2_C1_public {
        f() {
        }
    }
    m2.m2_C1_public = m2_C1_public;
    class m2_C2_private {
    }
    class m2_C3_public {
        constructor(m2_c3_c1_2) {
        }
        f1_private(m2_c3_f1_arg) {
        }
        f2_public(m2_c3_f2_arg) {
        }
        f3_private(m2_c3_f3_arg) {
        }
        f4_public(m2_c3_f4_arg) {
        }
        f5_private() {
            return new m2_C1_public();
        }
        f6_public() {
            return new m2_C1_public();
        }
        f7_private() {
            return new m2_C2_private();
        }
        f8_public() {
            return new m2_C2_private();
        }
        f9_private() {
            return new m2_C1_public();
        }
        f10_public() {
            return new m2_C1_public();
        }
        f11_private() {
            return new m2_C2_private();
        }
        f12_public() {
            return new m2_C2_private();
        }
    }
    m2.m2_C3_public = m2_C3_public;
    class m2_C4_private {
        constructor(m2_c4_c1_2) {
        }
        f1_private(m2_c4_f1_arg) {
        }
        f2_public(m2_c4_f2_arg) {
        }
        f3_private(m2_c4_f3_arg) {
        }
        f4_public(m2_c4_f4_arg) {
        }
        f5_private() {
            return new m2_C1_public();
        }
        f6_public() {
            return new m2_C1_public();
        }
        f7_private() {
            return new m2_C2_private();
        }
        f8_public() {
            return new m2_C2_private();
        }
        f9_private() {
            return new m2_C1_public();
        }
        f10_public() {
            return new m2_C1_public();
        }
        f11_private() {
            return new m2_C2_private();
        }
        f12_public() {
            return new m2_C2_private();
        }
    }
    class m2_C5_public {
        constructor(m2_c5_c) {
        }
    }
    m2.m2_C5_public = m2_C5_public;
    class m2_C6_private {
        constructor(m2_c6_c) {
        }
    }
    class m2_C7_public {
        constructor(m2_c7_c) {
        }
    }
    m2.m2_C7_public = m2_C7_public;
    class m2_C8_private {
        constructor(m2_c8_c) {
        }
    }
    function f1_public(m2_f1_arg) {
    }
    function f2_public(m2_f2_arg) {
    }
    m2.f2_public = f2_public;
    function f3_public(m2_f3_arg) {
    }
    function f4_public(m2_f4_arg) {
    }
    m2.f4_public = f4_public;
    function f5_public() {
        return new m2_C1_public();
    }
    function f6_public() {
        return new m2_C1_public();
    }
    m2.f6_public = f6_public;
    function f7_public() {
        return new m2_C2_private();
    }
    function f8_public() {
        return new m2_C2_private();
    }
    m2.f8_public = f8_public;
    function f9_private() {
        return new m2_C1_public();
    }
    function f10_public() {
        return new m2_C1_public();
    }
    m2.f10_public = f10_public;
    function f11_private() {
        return new m2_C2_private();
    }
    function f12_public() {
        return new m2_C2_private();
    }
    m2.f12_public = f12_public;
})(m2 || (m2 = {}));
class C5_private {
    f() {
    }
}
class C6_public {
}
exports.C6_public = C6_public;
class C7_public {
    constructor(c7_c1_2) {
    }
    f1_private(c7_f1_arg) {
    }
    f2_public(c7_f2_arg) {
    }
    f3_private(c7_f3_arg) {
    }
    f4_public(c7_f4_arg) {
    }
    f5_private() {
        return new C6_public();
    }
    f6_public() {
        return new C6_public();
    }
    f7_private() {
        return new C5_private();
    }
    f8_public() {
        return new C5_private();
    }
    f9_private() {
        return new C6_public();
    }
    f10_public() {
        return new C6_public();
    }
    f11_private() {
        return new C5_private();
    }
    f12_public() {
        return new C5_private();
    }
}
exports.C7_public = C7_public;
class C8_private {
    constructor(c8_c1_2) {
    }
    f1_private(c8_f1_arg) {
    }
    f2_public(c8_f2_arg) {
    }
    f3_private(c8_f3_arg) {
    }
    f4_public(c8_f4_arg) {
    }
    f5_private() {
        return new C6_public();
    }
    f6_public() {
        return new C6_public();
    }
    f7_private() {
        return new C5_private();
    }
    f8_public() {
        return new C5_private();
    }
    f9_private() {
        return new C6_public();
    }
    f10_public() {
        return new C6_public();
    }
    f11_private() {
        return new C5_private();
    }
    f12_public() {
        return new C5_private();
    }
}
class C9_public {
    constructor(c9_c) {
    }
}
exports.C9_public = C9_public;
class C10_private {
    constructor(c10_c) {
    }
}
class C11_public {
    constructor(c11_c) {
    }
}
exports.C11_public = C11_public;
class C12_private {
    constructor(c12_c) {
    }
}
function f1_private(f1_arg) {
}
function f2_public(f2_arg) {
}
function f3_private(f3_arg) {
}
function f4_public(f4_arg) {
}
function f5_private() {
    return new C6_public();
}
function f6_public() {
    return new C6_public();
}
function f7_private() {
    return new C5_private();
}
function f8_public() {
    return new C5_private();
}
function f9_private() {
    return new C6_public();
}
function f10_public() {
    return new C6_public();
}
function f11_private() {
    return new C5_private();
}
function f12_public() {
    return new C5_private();
}
