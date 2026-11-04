// @strict: true
// @strictNullChecks: true, false
// @target: esnext
// @noEmit: true

function truthyComparisons(text: string | undefined, number: number | undefined, bigint: bigint | undefined) {
    if (text) {
        text !== "";
        "" !== text;
        text === "";
        "" === text;
        text != "";
        "" == text;
        const refined: string & not "" = text;
        switch (text) {
            case "": break;
        }
    }
    if (number) {
        number !== 0;
        0 === number;
        const refined: number & not 0 = number;
    }
    if (bigint) {
        bigint !== 0n;
        0n === bigint;
        const refined: bigint & not 0n = bigint;
    }
}

function excludedComparison(text: string) {
    if (text !== "excluded") {
        text === "excluded";
        "excluded" !== text;
        const refined: string & not "excluded" = text;
    }
}

function explicitExclusion(text: string & not "", number: number & not 0) {
    text === ""; // Error: an explicit exclusion remains disjoint.
    "" !== text; // Error
    number !== 0; // Error
    0 === number; // Error
    if (text) {
        text === ""; // Error: truthiness must not erase the declared exclusion.
    }
    switch (text) {
        case "": break; // Error
    }
}

function disjointLiterals(text: "present", number: 1) {
    text === ""; // Error
    "" !== text; // Error
    number !== 0; // Error
    0 === number; // Error
}
