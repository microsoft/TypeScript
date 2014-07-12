//// [this_inside-enum-should-not-be-allowed.js]
var TopLevelEnum;
(function (TopLevelEnum) {
    TopLevelEnum[TopLevelEnum["ThisWasAllowedButShouldNotBe"] = this] = "ThisWasAllowedButShouldNotBe";
})(TopLevelEnum || (TopLevelEnum = {}));

var ModuleEnum;
(function (ModuleEnum) {
    var EnumInModule;
    (function (EnumInModule) {
        EnumInModule[EnumInModule["WasADifferentError"] = this] = "WasADifferentError";
    })(EnumInModule || (EnumInModule = {}));
})(ModuleEnum || (ModuleEnum = {}));
