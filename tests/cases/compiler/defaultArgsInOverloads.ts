function fun(a: string);
function fun(a = 3);
function fun(a = null) { }

class C {
	fun(a: string);
	fun(a = 3);
	fun(a = null) { }
	static fun(a: string);
	static fun(a = 3);
	static fun(a = null) { }
}

interface I {
    fun(a: string);
    fun(a = 3);
}

var f: (a = 3) => number;