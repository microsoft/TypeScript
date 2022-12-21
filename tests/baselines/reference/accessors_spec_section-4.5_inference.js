//// [accessors_spec_section-4.5_inference.ts]
class A { }
class B extends A { }

class LanguageSpec_section_4_5_inference {

    public set InferredGetterFromSetterAnnotation(a: A) { }
    public get InferredGetterFromSetterAnnotation() { return new B(); }

    public get InferredGetterFromSetterAnnotation_GetterFirst() { return new B(); }
    public set InferredGetterFromSetterAnnotation_GetterFirst(a: A) { }
    

    public get InferredFromGetter() { return new B(); }
    public set InferredFromGetter(a) { }

    public set InferredFromGetter_SetterFirst(a) { }
    public get InferredFromGetter_SetterFirst() { return new B(); }

    public set InferredSetterFromGetterAnnotation(a) { }
    public get InferredSetterFromGetterAnnotation() : A { return new B(); }

    public get InferredSetterFromGetterAnnotation_GetterFirst() : A { return new B(); }
    public set InferredSetterFromGetterAnnotation_GetterFirst(a) { }
}

//// [accessors_spec_section-4.5_inference.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(A));
var LanguageSpec_section_4_5_inference = /** @class */ (function () {
    function LanguageSpec_section_4_5_inference() {
    }
    Object.defineProperty(LanguageSpec_section_4_5_inference.prototype, "InferredGetterFromSetterAnnotation", {
        get: function () { return new B(); },
        set: function (a) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LanguageSpec_section_4_5_inference.prototype, "InferredGetterFromSetterAnnotation_GetterFirst", {
        get: function () { return new B(); },
        set: function (a) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LanguageSpec_section_4_5_inference.prototype, "InferredFromGetter", {
        get: function () { return new B(); },
        set: function (a) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LanguageSpec_section_4_5_inference.prototype, "InferredFromGetter_SetterFirst", {
        get: function () { return new B(); },
        set: function (a) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LanguageSpec_section_4_5_inference.prototype, "InferredSetterFromGetterAnnotation", {
        get: function () { return new B(); },
        set: function (a) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LanguageSpec_section_4_5_inference.prototype, "InferredSetterFromGetterAnnotation_GetterFirst", {
        get: function () { return new B(); },
        set: function (a) { },
        enumerable: false,
        configurable: true
    });
    return LanguageSpec_section_4_5_inference;
}());
