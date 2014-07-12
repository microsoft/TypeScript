// Case 5
class Base5 {
    public x() {
        return "BaseX";
    }
    
    public y() {
        return "BaseY";
    }
}

class Sub5 extends Base5 {
    public x() {
        return "SubX";
    }
}

class SubSub5 extends Sub5 {
    public x() {
        return super.x();
    }
    public y() {
        return super.y();
    }
}

// Case 6
class Base6 {
    public x() {
        return "BaseX";
    }
}

class Sub6 extends Base6 {
    public y() {
        return "SubY";
    }
}

class SubSub6 extends Sub6 {
    public y() {
        return super.y();
    }
}


var results1 = new SubSub5();
var results2 = new SubSub6();
results1.x() + results1.y() + results2.y();
