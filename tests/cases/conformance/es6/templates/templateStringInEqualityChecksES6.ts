// @target: ES6
var x = `abc${0}abc` === `abc` ||
        `abc` !== `abc${0}abc` &&
        `abc${0}abc` == "abc0abc" &&
        "abc0abc" !== `abc${0}abc`;