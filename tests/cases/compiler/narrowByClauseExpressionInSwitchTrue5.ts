// @strict: true
// @noEmit: true

type A = { kind: "A", value: number };
type B = { kind: "B", name: string };
type C = { kind: "C", cond: boolean };
type D = { kind: "D", value: boolean };
type E = { kind: "E", x: number, y: number };

type All = A | B | C | D | E;

function fn1switch(input: All) {
    switch (true) {
        case input.kind === "A":
        case input.kind === "B":
            if (input.kind === "A") {
                return;
            }

            input; // Should be B;
            //  ^?

            // fallthrough
        case input.kind === "C":
            input; // Should be B | C
            //  ^?
            break;
        default:
            input; // Should be D | E
            //  ^?
    }

    input; // Should not be A
    //  ^?
}

function fn1ifelse(input: All) {
    if (input.kind === "A" || input.kind === "B") {
        if (input.kind === "A") {
            return;
        }

        input; // Should be B;
        //  ^?
    }
    if (input.kind === "C" || input.kind === "B") {
        input; // Should be B | C
        //  ^?
    }
    else {
        input; // Should be D | E
        //  ^?
    }

    input; // Should not be A
    //  ^?
}

function fn2switch(input: All) {
    switch (true) {
        case input.kind === "A":
        case input.kind === "B":
            if (input.kind === "A") {
                return;
            }

            input; // Should be B;
            //  ^?

            // fallthrough
        case input.kind === "C":
            input; // Should be B | C
            //  ^?
            break;
        default:
            input; // Should be D | E
            //  ^?
            return;
    }

    input; // Should be B | C
    //  ^?
}

function fn2ifelse(input: All) {
    if (input.kind === "A" || input.kind === "B") {
        if (input.kind === "A") {
            return;
        }

        input; // Should be B;
        //  ^?
    }
    if (input.kind === "C" || input.kind === "B") {
        input; // Should be B | C
        //  ^?
    }
    else {
        input; // Should be D | E
        //  ^?
        return;
    }

    input; // Should be B | C
    //  ^?
}

function fn3switch(input: All) {
    switch (true) {
        case input.kind === "A":
        case input.kind === "B":
            if (input.kind === "A") {
                return;
            }

            input; // Should be B;
            //  ^?

            // fallthrough
        default:
            input; // Should be B | D | E
            //  ^?
            break;

        case input.kind === "C":
            input; // Should be C
            //  ^?
            break;
    }

    input; // Should not be A
    //  ^?
}
