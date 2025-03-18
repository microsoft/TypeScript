//// [tests/cases/compiler/asiPublicPrivateProtected.ts] ////

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
class NonPublicClass {
    s() {
    }
}
class NonPublicClass2 {
    public;
    nonPublicFunction() {
    }
}
private;
class NonPrivateClass {
    s() {
    }
}
class NonPrivateClass2 {
    private;
    nonPrivateFunction() {
    }
}
protected;
class NonProtectedClass {
    s() {
    }
}
class NonProtectedClass2 {
    protected;
    nonProtectedFunction() {
    }
}
class ClassWithThreeMembers {
    public;
    private;
    protected;
}
