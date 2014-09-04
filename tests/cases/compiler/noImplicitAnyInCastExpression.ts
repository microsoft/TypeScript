interface IBar {
    b: number;
}
interface IFoo {
    p: IBar[];
}

function foo(a: any) { }

foo(<IFoo> {
    p: null,
});