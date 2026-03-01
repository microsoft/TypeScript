//// [tests/cases/conformance/classes/propertyMemberDeclarations/initializationOrdering1.ts] ////

//// [initializationOrdering1.ts]
class Helper {
    create(): boolean {
        return true
    }
}

export class Broken {
    constructor(readonly facade: Helper) {
        console.log(this.bug)
    }
    bug = this.facade.create()

}

new Broken(new Helper)

//// [initializationOrdering1.js]
class Helper {
    create() {
        return true;
    }
}
export class Broken {
    constructor(facade) {
        this.facade = facade;
        this.bug = this.facade.create();
        console.log(this.bug);
    }
}
new Broken(new Helper);
