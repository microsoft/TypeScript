// @strict: true

class AA {
    do1() {
        const b = dd.getB();
        if (this === b) {
            console.log("this === b");
        }
    }
}

class BB extends AA {
    getB(): BB { return this; }
}

let dd = new BB();
dd.do1();