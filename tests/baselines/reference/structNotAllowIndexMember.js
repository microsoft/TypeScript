//// [structNotAllowIndexMember.ts]
// doc 5
// no indexers are allowed
struct S {
	[x: string]: string;
	[y: number]: string;
}

// private indexers not allowed

struct C1 {
	private [x: string]: string;
}

/* struct D1 {
	private [x: number]: string;
}

struct E1<T> {
	private [x: string]: T;
} */

// public indexers not allowed

struct C2 {
	public [x: string]: string;
}

struct D2 {
	public [x: number]: string;
}

/* struct E2<T> {
	public [x: string]: T;
} */

// static indexers not allowed

struct C3 {
	static [x: string]: string;
}

struct D3 {
	static [x: number]: string;
}

/* struct E3<T> {
	static [x: string]: T;
} */


//// [structNotAllowIndexMember.js]
// doc 5
// no indexers are allowed
var S = (function () {
    var _S = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function S() {
        var obj = new _S();
        _ctor.call(obj);
        return obj;
    }
    S._TO = _S;
    return S;
})();
// private indexers not allowed
var C1 = (function () {
    var _C1 = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function C1() {
        var obj = new _C1();
        _ctor.call(obj);
        return obj;
    }
    C1._TO = _C1;
    return C1;
})();
/* struct D1 {
    private [x: number]: string;
}

struct E1<T> {
    private [x: string]: T;
} */
// public indexers not allowed
var C2 = (function () {
    var _C2 = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function C2() {
        var obj = new _C2();
        _ctor.call(obj);
        return obj;
    }
    C2._TO = _C2;
    return C2;
})();
var D2 = (function () {
    var _D2 = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function D2() {
        var obj = new _D2();
        _ctor.call(obj);
        return obj;
    }
    D2._TO = _D2;
    return D2;
})();
/* struct E2<T> {
    public [x: string]: T;
} */
// static indexers not allowed
var C3 = (function () {
    var _C3 = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function C3() {
        var obj = new _C3();
        _ctor.call(obj);
        return obj;
    }
    C3._TO = _C3;
    return C3;
})();
var D3 = (function () {
    var _D3 = new TypedObject.StructType({
    });
    function _ctor() {
    }
    function D3() {
        var obj = new _D3();
        _ctor.call(obj);
        return obj;
    }
    D3._TO = _D3;
    return D3;
})();
/* struct E3<T> {
    static [x: string]: T;
} */
