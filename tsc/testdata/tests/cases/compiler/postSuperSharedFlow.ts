// @target: es2015
// @strict: true

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
