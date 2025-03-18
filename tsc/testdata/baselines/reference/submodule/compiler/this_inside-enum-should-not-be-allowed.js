//// [tests/cases/compiler/this_inside-enum-should-not-be-allowed.ts] ////

//// [this_inside-enum-should-not-be-allowed.ts]
enum TopLevelEnum {
    ThisWasAllowedButShouldNotBe = this // Should not be allowed
}

module ModuleEnum {
    enum EnumInModule {
        WasADifferentError = this // this was handled as if this was in a module
    }
}

//// [this_inside-enum-should-not-be-allowed.js]
var TopLevelEnum;
(function (TopLevelEnum) {
    TopLevelEnum["ThisWasAllowedButShouldNotBe"] = this;
    if (typeof TopLevelEnum.ThisWasAllowedButShouldNotBe !== "string") TopLevelEnum[TopLevelEnum.ThisWasAllowedButShouldNotBe] = "ThisWasAllowedButShouldNotBe";
})(TopLevelEnum || (TopLevelEnum = {}));
var ModuleEnum;
(function (ModuleEnum) {
    let EnumInModule;
    (function (EnumInModule) {
        EnumInModule["WasADifferentError"] = this;
        if (typeof EnumInModule.WasADifferentError !== "string") EnumInModule[EnumInModule.WasADifferentError] = "WasADifferentError";
    })(EnumInModule || (EnumInModule = {}));
})(ModuleEnum || (ModuleEnum = {}));
