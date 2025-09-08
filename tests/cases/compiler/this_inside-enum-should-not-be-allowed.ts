enum TopLevelEnum {
    ThisWasAllowedButShouldNotBe = this // Should not be allowed
}

namespace ModuleEnum {
    enum EnumInModule {
        WasADifferentError = this // this was handled as if this was in a module
    }
}