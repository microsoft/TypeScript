{
    export { a } from "exportNamed";
    export * from "exportStar";
    import { b } from "importNamed";
    import c = require("importEquals");
    import "sideEffect";
}
