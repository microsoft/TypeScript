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
