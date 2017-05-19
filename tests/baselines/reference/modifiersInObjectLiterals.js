//// [modifiersInObjectLiterals.ts]
let data = {
	public foo: 'hey',
	private bar: 'nay',
	protected baz: 'oh my',
	abstract noWay: 'yes'	
};

data.foo + data.bar + data.baz + data.noWay


//// [modifiersInObjectLiterals.js]
var data = {
    foo: 'hey',
    bar: 'nay',
    baz: 'oh my',
    noWay: 'yes'
};
data.foo + data.bar + data.baz + data.noWay;
