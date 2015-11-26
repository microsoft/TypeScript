// doc 2.2
// Due to Typed Objects being nonextensible and non-configurable, accessors are not allowed.

struct C {
	static _bar: number;

	static get bar() { // error, getters are not allowed in struct
		return C._bar;
	}
}