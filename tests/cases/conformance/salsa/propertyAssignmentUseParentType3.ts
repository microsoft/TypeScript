// don't use the parent type if it's a function declaration (#33741)

function foo1(): number {
    return 123;
}
foo1.toFixed = "";

function foo2(): any[] {
    return [];
}
foo2.join = "";

function foo3(): string {
    return "";
}
foo3.trim = "";

function foo4(): ({x: number}) {
    return {x: 123};
}
foo4.x = "456";
