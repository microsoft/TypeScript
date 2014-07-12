//// [accessors_spec_section-4.5_error-cases.js]
var LanguageSpec_section_4_5_error_cases = (function () {
    function LanguageSpec_section_4_5_error_cases() {
    }
    Object.defineProperty(LanguageSpec_section_4_5_error_cases.prototype, "AnnotatedSetter_SetterFirst", {
        get: function () {
            return "";
        },
        set: function (a) {
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LanguageSpec_section_4_5_error_cases.prototype, "AnnotatedSetter_SetterLast", {
        get: function () {
            return "";
        },
        set: function (a) {
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LanguageSpec_section_4_5_error_cases.prototype, "AnnotatedGetter_GetterFirst", {
        get: function () {
            return "";
        },
        set: function (aStr) {
            aStr = 0;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(LanguageSpec_section_4_5_error_cases.prototype, "AnnotatedGetter_GetterLast", {
        get: function () {
            return "";
        },
        set: function (aStr) {
            aStr = 0;
        },
        enumerable: true,
        configurable: true
    });
    return LanguageSpec_section_4_5_error_cases;
})();
