//// [tests/cases/compiler/decoratorMetadataWithImportDeclarationNameCollision7.ts] ////

//// [db.ts]
export default class db {
    public doSomething() {
    }
}

//// [service.ts]
import db from './db';
function someDecorator(target) {
    return target;
}
@someDecorator
class MyClass {
    db: db.db; //error

    constructor(db: db.db) { // error
        this.db = db;
        this.db.doSomething();
    }
}
export {MyClass};


/// [Declarations] ////



//// [db.d.ts]
export default class db {
    doSomething(): invalid;
}

//// [service.d.ts]
import db from './db';
declare class MyClass {
    db: db.db;
    constructor(db: db.db);
}
export { MyClass };

/// [Errors] ////

db.ts(2,12): error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
service.ts(7,9): error TS2702: 'db' only refers to a type, but is being used as a namespace here.
service.ts(7,9): error TS4031: Public property 'db' of exported class has or is using private name 'db'.
service.ts(9,21): error TS2702: 'db' only refers to a type, but is being used as a namespace here.
service.ts(9,21): error TS4063: Parameter 'db' of constructor from exported class has or is using private name 'db'.


==== db.ts (1 errors) ====
    export default class db {
        public doSomething() {
               ~~~~~~~~~~~
!!! error TS9007: Declaration emit for this file requires type resolution. An explicit type annotation may unblock declaration emit.
        }
    }
    
==== service.ts (4 errors) ====
    import db from './db';
    function someDecorator(target) {
        return target;
    }
    @someDecorator
    class MyClass {
        db: db.db; //error
            ~~
!!! error TS2702: 'db' only refers to a type, but is being used as a namespace here.
            ~~
!!! error TS4031: Public property 'db' of exported class has or is using private name 'db'.
    
        constructor(db: db.db) { // error
                        ~~
!!! error TS2702: 'db' only refers to a type, but is being used as a namespace here.
                        ~~
!!! error TS4063: Parameter 'db' of constructor from exported class has or is using private name 'db'.
            this.db = db;
            this.db.doSomething();
        }
    }
    export {MyClass};
    