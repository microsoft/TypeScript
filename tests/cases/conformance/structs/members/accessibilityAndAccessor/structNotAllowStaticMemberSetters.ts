// doc 2.2
// Due to Typed Objects being nonextensible and non-configurable, accessors are not allowed.

struct C {
    static _bar: number;

	static set bar(new_bar: number) { // error, setters are not allowed in struct
		C._bar = new_bar;
	}
}