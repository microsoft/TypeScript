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
