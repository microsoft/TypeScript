//// [tests/cases/compiler/postSuperSharedFlow.ts] ////

//// [postSuperSharedFlow.ts]
class Base {
    value = 0;
}

class AllPaths extends Base {
    constructor(condition: boolean) {
        if (condition) {
            super();
        } else {
            super();
        }
        this.value++;
        this.value++;
        while (condition) {
            this.value++;
            condition = false;
        }
        try {
            this.value++;
        } finally {
            this.value++;
        }
    }
}

class MissingPath extends Base {
    constructor(condition: boolean) {
        if (condition) {
            super();
        }
        this.value++;
        this.value++;
        super();
        this.value++;
    }
}


//// [postSuperSharedFlow.js]
"use strict";
class Base {
    constructor() {
        this.value = 0;
    }
}
class AllPaths extends Base {
    constructor(condition) {
        if (condition) {
            super();
        }
        else {
            super();
        }
        this.value++;
        this.value++;
        while (condition) {
            this.value++;
            condition = false;
        }
        try {
            this.value++;
        }
        finally {
            this.value++;
        }
    }
}
class MissingPath extends Base {
    constructor(condition) {
        if (condition) {
            super();
        }
        this.value++;
        this.value++;
        super();
        this.value++;
    }
}
