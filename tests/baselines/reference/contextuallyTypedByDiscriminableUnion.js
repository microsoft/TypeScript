//// [contextuallyTypedByDiscriminableUnion.ts]
type ADT = {
    kind: "a",
    method(x: string): number;
} | {
    kind: "b",
    method(x: number): string;
};


function invoke(item: ADT) {
    if (item.kind === "a") {
        item.method("");
    }
    else {
        item.method(42);
    }
}

invoke({
    kind: "a",
    method(a) {
        return +a;
    }
});


//// [contextuallyTypedByDiscriminableUnion.js]
function invoke(item) {
    if (item.kind === "a") {
        item.method("");
    }
    else {
        item.method(42);
    }
}
invoke({
    kind: "a",
    method: function (a) {
        return +a;
    }
});
