// @target: es6
const a: {
    y(): "a"
} = {
    y: () => "b"
};

interface Foo {
    a: number;
}

function foo1(): () => Foo {
    return () => ({a: ''});
}

function foo3(): Foo[] {
    return [{a: ''}];
}
var y: Foo[] = [{a: ''}]