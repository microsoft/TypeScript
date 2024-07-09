// Case 1
class Base1 {
    public foo() {
        return "base";
    }
}

class Sub1 extends Base1 {
    public bar() {
        return "base";
    }
}

class SubSub1 extends Sub1 {
    public bar() {
        return super.super.foo;
    }
}

// Case 2
class Base2 {
    public foo() {
        return "base";
    }
}

class SubE2 extends Base2 {
    public bar() {
        return super.prototype.foo = null;
    }
}

// Case 3
class Base3 {
    public foo() {
        return "base";
    }
}

class SubE3 extends Base3 {
    public bar() {
        return super.bar();
    }
}

// Case 4
module Base4 {
    class Sub4 {
        public x(){
            return "hello";
        }
    }
    
    export class SubSub4 extends Sub4{
        public x(){
            return super.x();
        }
    }
    
    export class Sub4E {
        public x() {
            return super.x();
        }
    }
}
