//// [asiPublicPrivateProtected.ts]
public
class NonPublicClass {
    public s() {
    }
}

class NonPublicClass2 {
    public
    private nonPublicFunction() {
    }
}
private
class NonPrivateClass {
    private s() {
    }
}

class NonPrivateClass2 {
    private
    public nonPrivateFunction() {
    }
}
protected
class NonProtectedClass {
  protected s() {
  }
}

class NonProtectedClass2 {
    protected
    public nonProtectedFunction() {
    }
}

class ClassWithThreeMembers {
    public
    private
    protected
}


//// [asiPublicPrivateProtected.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
public;
var NonPublicClass = (function () {
    function NonPublicClass() {
    }
    NonPublicClass.prototype.s = function () {
    };
    __names(NonPublicClass.prototype, ["s"]);
    return NonPublicClass;
}());
var NonPublicClass2 = (function () {
    function NonPublicClass2() {
    }
    NonPublicClass2.prototype.nonPublicFunction = function () {
    };
    __names(NonPublicClass2.prototype, ["nonPublicFunction"]);
    return NonPublicClass2;
}());
private;
var NonPrivateClass = (function () {
    function NonPrivateClass() {
    }
    NonPrivateClass.prototype.s = function () {
    };
    __names(NonPrivateClass.prototype, ["s"]);
    return NonPrivateClass;
}());
var NonPrivateClass2 = (function () {
    function NonPrivateClass2() {
    }
    NonPrivateClass2.prototype.nonPrivateFunction = function () {
    };
    __names(NonPrivateClass2.prototype, ["nonPrivateFunction"]);
    return NonPrivateClass2;
}());
protected;
var NonProtectedClass = (function () {
    function NonProtectedClass() {
    }
    NonProtectedClass.prototype.s = function () {
    };
    __names(NonProtectedClass.prototype, ["s"]);
    return NonProtectedClass;
}());
var NonProtectedClass2 = (function () {
    function NonProtectedClass2() {
    }
    NonProtectedClass2.prototype.nonProtectedFunction = function () {
    };
    __names(NonProtectedClass2.prototype, ["nonProtectedFunction"]);
    return NonProtectedClass2;
}());
var ClassWithThreeMembers = (function () {
    function ClassWithThreeMembers() {
    }
    return ClassWithThreeMembers;
}());
