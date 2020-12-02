//// [protoOverlapVariables.ts]
let proto = "gotcha!";

class DeclarationWithOne {
    member() {
        return this;
    }
}

class DeclarationWithTwo {
    memberOne() {
        return this;
    }
    
    memberTwo() {
        return this;
    }
}

const Expression = class {
    memberOne() {
        return this;
    }
    
    memberTwo() {
        return this;
    }
};


//// [protoOverlapVariables.js]
var proto = "gotcha!";
var DeclarationWithOne = /** @class */ (function () {
    function DeclarationWithOne() {
    }
    DeclarationWithOne.prototype.member = function () {
        return this;
    };
    return DeclarationWithOne;
}());
var DeclarationWithTwo = /** @class */ (function () {
    function DeclarationWithTwo() {
    }
    var DeclarationWithTwo_prototype = DeclarationWithTwo.prototype;
    DeclarationWithTwo_prototype.memberOne = function () {
        return this;
    };
    DeclarationWithTwo_prototype.memberTwo = function () {
        return this;
    };
    return DeclarationWithTwo;
}());
var Expression = /** @class */ (function () {
    function Expression() {
    }
    var proto_1 = Expression.prototype;
    proto_1.memberOne = function () {
        return this;
    };
    proto_1.memberTwo = function () {
        return this;
    };
    return Expression;
}());
