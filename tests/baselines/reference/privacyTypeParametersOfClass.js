//// [privacyTypeParametersOfClass.js]
var privateClass = (function () {
    function privateClass() {
    }
    return privateClass;
})();

var publicClass = (function () {
    function publicClass() {
    }
    return publicClass;
})();
exports.publicClass = publicClass;

// TypeParameter_0_of_exported_class_1_has_or_is_using_private_type_2
var publicClassWithPrivateTypeParameters = (function () {
    function publicClassWithPrivateTypeParameters() {
    }
    publicClassWithPrivateTypeParameters.prototype.myMethod = function (val) {
        return val;
    };
    return publicClassWithPrivateTypeParameters;
})();
exports.publicClassWithPrivateTypeParameters = publicClassWithPrivateTypeParameters;

var publicClassWithPublicTypeParameters = (function () {
    function publicClassWithPublicTypeParameters() {
    }
    publicClassWithPublicTypeParameters.prototype.myMethod = function (val) {
        return val;
    };
    return publicClassWithPublicTypeParameters;
})();
exports.publicClassWithPublicTypeParameters = publicClassWithPublicTypeParameters;

var privateClassWithPrivateTypeParameters = (function () {
    function privateClassWithPrivateTypeParameters() {
    }
    privateClassWithPrivateTypeParameters.prototype.myMethod = function (val) {
        return val;
    };
    return privateClassWithPrivateTypeParameters;
})();

var privateClassWithPublicTypeParameters = (function () {
    function privateClassWithPublicTypeParameters() {
    }
    privateClassWithPublicTypeParameters.prototype.myMethod = function (val) {
        return val;
    };
    return privateClassWithPublicTypeParameters;
})();

var publicClassWithPublicTypeParametersWithoutExtends = (function () {
    function publicClassWithPublicTypeParametersWithoutExtends() {
    }
    publicClassWithPublicTypeParametersWithoutExtends.prototype.myMethod = function (val) {
        return val;
    };
    return publicClassWithPublicTypeParametersWithoutExtends;
})();
exports.publicClassWithPublicTypeParametersWithoutExtends = publicClassWithPublicTypeParametersWithoutExtends;

var privateClassWithPublicTypeParametersWithoutExtends = (function () {
    function privateClassWithPublicTypeParametersWithoutExtends() {
    }
    privateClassWithPublicTypeParametersWithoutExtends.prototype.myMethod = function (val) {
        return val;
    };
    return privateClassWithPublicTypeParametersWithoutExtends;
})();
