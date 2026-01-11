//// [tests/cases/conformance/types/literal/stringLiteralsWithSwitchStatements01.ts] ////

//// [stringLiteralsWithSwitchStatements01.ts]
declare let x: "foo";
declare let y: "foo" | "bar";

switch (x) {
    case "foo":
        break;
    case "bar":
        break;
    case y:
        y;
        break;
}


//// [stringLiteralsWithSwitchStatements01.js]
switch (x) {
    case "foo":
        break;
    case "bar":
        break;
    case y:
        y;
        break;
}
