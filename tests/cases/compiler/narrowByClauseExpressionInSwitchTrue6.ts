// @strict: true
// @noEmit: true

interface A {
    kind: "a";
    aProps: string;
}

interface B {
    kind: "b";
    bProps: string;
}

interface C {
    kind: "c";
    cProps: string;
}


type MyType = A | B | C;

function isA(x: MyType) {
    switch (true) {
        default:
            const never: never = x;
        case x.kind === "a":
            x.aProps;
            break;
        case x.kind === "b":
            x.bProps;
            break;
        case x.kind === "c":
            x.cProps;
            break;
    }

    switch (true) {
        default:
            const never: never = x;
        case x.kind === "a": {
            x.aProps;
            break;
        }
        case x.kind === "b": {
            x.bProps;
            break;
        }
        case x.kind === "c": {
            x.cProps;
            break;
        }
    }
    
    switch (true) {
        default:
            x.aProps;
            break;
        case x.kind === "b":
            x.bProps;
            break;
        case x.kind === "c":
            x.cProps;
            break;
    }

    switch (true) {
        default:
            const never: never = x;
        case x.kind === "a":
            x.aProps;
            // fallthrough
        case x.kind === "b":
            x.bProps;
            // fallthrough
        case x.kind === "c":
            x.cProps;
    }
}
