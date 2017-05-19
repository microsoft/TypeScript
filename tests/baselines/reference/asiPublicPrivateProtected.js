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
public;
var NonPublicClass = (function () {
    function NonPublicClass() {
    }
    NonPublicClass.prototype.s = function () {
    };
    return NonPublicClass;
}());
var NonPublicClass2 = (function () {
    function NonPublicClass2() {
    }
    NonPublicClass2.prototype.nonPublicFunction = function () {
    };
    return NonPublicClass2;
}());
private;
var NonPrivateClass = (function () {
    function NonPrivateClass() {
    }
    NonPrivateClass.prototype.s = function () {
    };
    return NonPrivateClass;
}());
var NonPrivateClass2 = (function () {
    function NonPrivateClass2() {
    }
    NonPrivateClass2.prototype.nonPrivateFunction = function () {
    };
    return NonPrivateClass2;
}());
protected;
var NonProtectedClass = (function () {
    function NonProtectedClass() {
    }
    NonProtectedClass.prototype.s = function () {
    };
    return NonProtectedClass;
}());
var NonProtectedClass2 = (function () {
    function NonProtectedClass2() {
    }
    NonProtectedClass2.prototype.nonProtectedFunction = function () {
    };
    return NonProtectedClass2;
}());
var ClassWithThreeMembers = (function () {
    function ClassWithThreeMembers() {
    }
    return ClassWithThreeMembers;
}());
