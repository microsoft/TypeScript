//// [privacyTypeParameterOfFunction.js]
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

var publicClassWithWithPrivateTypeParameters = (function () {
    function publicClassWithWithPrivateTypeParameters() {
    }
    // TypeParameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_type_1
    publicClassWithWithPrivateTypeParameters.myPublicStaticMethod = function () {
    };
    publicClassWithWithPrivateTypeParameters.myPrivateStaticMethod = function () {
    };

    // TypeParameter_0_of_public_method_from_exported_class_has_or_is_using_private_type_1
    publicClassWithWithPrivateTypeParameters.prototype.myPublicMethod = function () {
    };
    publicClassWithWithPrivateTypeParameters.prototype.myPrivateMethod = function () {
    };
    return publicClassWithWithPrivateTypeParameters;
})();
exports.publicClassWithWithPrivateTypeParameters = publicClassWithWithPrivateTypeParameters;

var publicClassWithWithPublicTypeParameters = (function () {
    function publicClassWithWithPublicTypeParameters() {
    }
    publicClassWithWithPublicTypeParameters.myPublicStaticMethod = function () {
    };
    publicClassWithWithPublicTypeParameters.myPrivateStaticMethod = function () {
    };
    publicClassWithWithPublicTypeParameters.prototype.myPublicMethod = function () {
    };
    publicClassWithWithPublicTypeParameters.prototype.myPrivateMethod = function () {
    };
    return publicClassWithWithPublicTypeParameters;
})();
exports.publicClassWithWithPublicTypeParameters = publicClassWithWithPublicTypeParameters;

var privateClassWithWithPrivateTypeParameters = (function () {
    function privateClassWithWithPrivateTypeParameters() {
    }
    privateClassWithWithPrivateTypeParameters.myPublicStaticMethod = function () {
    };
    privateClassWithWithPrivateTypeParameters.myPrivateStaticMethod = function () {
    };
    privateClassWithWithPrivateTypeParameters.prototype.myPublicMethod = function () {
    };
    privateClassWithWithPrivateTypeParameters.prototype.myPrivateMethod = function () {
    };
    return privateClassWithWithPrivateTypeParameters;
})();

var privateClassWithWithPublicTypeParameters = (function () {
    function privateClassWithWithPublicTypeParameters() {
    }
    privateClassWithWithPublicTypeParameters.myPublicStaticMethod = function () {
    };
    privateClassWithWithPublicTypeParameters.myPrivateStaticMethod = function () {
    };
    privateClassWithWithPublicTypeParameters.prototype.myPublicMethod = function () {
    };
    privateClassWithWithPublicTypeParameters.prototype.myPrivateMethod = function () {
    };
    return privateClassWithWithPublicTypeParameters;
})();

// TypeParameter_0_of_exported_function_has_or_is_using_private_type_1
function publicFunctionWithPrivateTypeParameters() {
}
exports.publicFunctionWithPrivateTypeParameters = publicFunctionWithPrivateTypeParameters;

function publicFunctionWithPublicTypeParameters() {
}
exports.publicFunctionWithPublicTypeParameters = publicFunctionWithPublicTypeParameters;

function privateFunctionWithPrivateTypeParameters() {
}

function privateFunctionWithPublicTypeParameters() {
}

var publicClassWithWithPublicTypeParametersWithoutExtends = (function () {
    function publicClassWithWithPublicTypeParametersWithoutExtends() {
    }
    publicClassWithWithPublicTypeParametersWithoutExtends.myPublicStaticMethod = function () {
    };
    publicClassWithWithPublicTypeParametersWithoutExtends.myPrivateStaticMethod = function () {
    };
    publicClassWithWithPublicTypeParametersWithoutExtends.prototype.myPublicMethod = function () {
    };
    publicClassWithWithPublicTypeParametersWithoutExtends.prototype.myPrivateMethod = function () {
    };
    return publicClassWithWithPublicTypeParametersWithoutExtends;
})();
exports.publicClassWithWithPublicTypeParametersWithoutExtends = publicClassWithWithPublicTypeParametersWithoutExtends;
var privateClassWithWithPublicTypeParametersWithoutExtends = (function () {
    function privateClassWithWithPublicTypeParametersWithoutExtends() {
    }
    privateClassWithWithPublicTypeParametersWithoutExtends.myPublicStaticMethod = function () {
    };
    privateClassWithWithPublicTypeParametersWithoutExtends.myPrivateStaticMethod = function () {
    };
    privateClassWithWithPublicTypeParametersWithoutExtends.prototype.myPublicMethod = function () {
    };
    privateClassWithWithPublicTypeParametersWithoutExtends.prototype.myPrivateMethod = function () {
    };
    return privateClassWithWithPublicTypeParametersWithoutExtends;
})();

function publicFunctionWithPublicTypeParametersWithoutExtends() {
}
exports.publicFunctionWithPublicTypeParametersWithoutExtends = publicFunctionWithPublicTypeParametersWithoutExtends;

function privateFunctionWithPublicTypeParametersWithoutExtends() {
}
