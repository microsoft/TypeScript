//// [commentsClass.ts]

/** This is class c2 without constuctor*/
class c2 {
}
var i2 = new c2();
var i2_c = c2;
class c3 {
    /** Constructor comment*/
    constructor() {
    }
}
var i3 = new c3();
var i3_c = c3;
/** Class comment*/
class c4 {
    /** Constructor comment*/
    constructor() {
    }
}
var i4 = new c4();
var i4_c = c4;
/** Class with statics*/
class c5 {
    static s1: number;
}
var i5 = new c5();
var i5_c = c5;

/// class with statics and constructor
class c6 { /// class with statics and constructor2
    /// s1 comment
    static s1: number; /// s1 comment2
    /// constructor comment
    constructor() { /// constructor comment2
    }
}
var i6 = new c6();
var i6_c = c6;

// class with statics and constructor
class c7 {
    // s1 comment
    static s1: number;
    // constructor comment
    constructor() {
    }
}
var i7 = new c7();
var i7_c = c7;

/** class with statics and constructor
 */
class c8 {
    /** s1 comment */
    static s1: number; /** s1 comment2 */
    /** constructor comment 
    */
    constructor() {
        /** constructor comment2 
        */
    }
}
var i8 = new c8();
var i8_c = c8;


//// [commentsClass.js]
var c2 = (function () {
    function c2() {
    }
    return c2;
})();
var i2 = new c2();
var i2_c = c2;
var c3 = (function () {
    function c3() {
    }
    return c3;
})();
var i3 = new c3();
var i3_c = c3;
var c4 = (function () {
    function c4() {
    }
    return c4;
})();
var i4 = new c4();
var i4_c = c4;
var c5 = (function () {
    function c5() {
    }
    return c5;
})();
var i5 = new c5();
var i5_c = c5;
var c6 = (function () {
    function c6() {
    }
    return c6;
})();
var i6 = new c6();
var i6_c = c6;
var c7 = (function () {
    function c7() {
    }
    return c7;
})();
var i7 = new c7();
var i7_c = c7;
var c8 = (function () {
    function c8() {
    }
    return c8;
})();
var i8 = new c8();
var i8_c = c8;


//// [commentsClass.d.ts]
declare class c2 {
}
declare var i2;
declare var i2_c;
declare class c3 {
    constructor ();
}
declare var i3;
declare var i3_c;
declare class c4 {
    constructor ();
}
declare var i4;
declare var i4_c;
declare class c5 {
    static s1;
}
declare var i5;
declare var i5_c;
declare class c6 {
    static s1;
    constructor ();
}
declare var i6;
declare var i6_c;
declare class c7 {
    static s1;
    constructor ();
}
declare var i7;
declare var i7_c;
declare class c8 {
    static s1;
    constructor ();
}
declare var i8;
declare var i8_c;
