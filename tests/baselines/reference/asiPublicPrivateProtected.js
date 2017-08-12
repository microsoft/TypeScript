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
    var proto_1 = NonPublicClass.prototype;
    proto_1.s = function () {
    };
    return NonPublicClass;
}());
var NonPublicClass2 = (function () {
    function NonPublicClass2() {
    }
    var proto_2 = NonPublicClass2.prototype;
    proto_2.nonPublicFunction = function () {
    };
    return NonPublicClass2;
}());
private;
var NonPrivateClass = (function () {
    function NonPrivateClass() {
    }
    var proto_3 = NonPrivateClass.prototype;
    proto_3.s = function () {
    };
    return NonPrivateClass;
}());
var NonPrivateClass2 = (function () {
    function NonPrivateClass2() {
    }
    var proto_4 = NonPrivateClass2.prototype;
    proto_4.nonPrivateFunction = function () {
    };
    return NonPrivateClass2;
}());
protected;
var NonProtectedClass = (function () {
    function NonProtectedClass() {
    }
    var proto_5 = NonProtectedClass.prototype;
    proto_5.s = function () {
    };
    return NonProtectedClass;
}());
var NonProtectedClass2 = (function () {
    function NonProtectedClass2() {
    }
    var proto_6 = NonProtectedClass2.prototype;
    proto_6.nonProtectedFunction = function () {
    };
    return NonProtectedClass2;
}());
var ClassWithThreeMembers = (function () {
    function ClassWithThreeMembers() {
    }
    return ClassWithThreeMembers;
}());
