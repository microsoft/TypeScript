export var ElementFlags: any;
(function (ElementFlags) {
    ElementFlags[ElementFlags["None"] = 0] = "None";
    ElementFlags[ElementFlags["Required"] = 1] = "Required";
    ElementFlags[ElementFlags["Optional"] = 2] = "Optional";
    ElementFlags[ElementFlags["Rest"] = 4] = "Rest";
    ElementFlags[ElementFlags["Variadic"] = 8] = "Variadic";
    ElementFlags[ElementFlags["Fixed"] = 3] = "Fixed";
    ElementFlags[ElementFlags["Variable"] = 12] = "Variable";
    ElementFlags[ElementFlags["NonRequired"] = 14] = "NonRequired";
})(ElementFlags || (ElementFlags = {}));
