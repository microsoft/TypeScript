// @declaration: true
class C<T> {
	public x: T;
}

var v1 : C<string>;

var y = v1.x; // should be 'string'