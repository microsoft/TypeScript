//// [tests/cases/compiler/nestedLoops.ts] ////

//// [nestedLoops.ts]
export class Test  {
    constructor() {

        let outerArray: Array<number> = [1, 2, 3];
        let innerArray: Array<number> = [1, 2, 3];

        for (let outer of outerArray)
            for (let inner of innerArray) {
                this.aFunction((newValue, oldValue) => {
                    let x = outer + inner + newValue;
                });
            }
    }

    public aFunction(func: (newValue: any, oldValue: any) => void): void {
    }
}

//// [nestedLoops.js]
export class Test {
    constructor() {
        let outerArray = [1, 2, 3];
        let innerArray = [1, 2, 3];
        for (let outer of outerArray)
            for (let inner of innerArray) {
                this.aFunction((newValue, oldValue) => {
                    let x = outer + inner + newValue;
                });
            }
    }
    aFunction(func) {
    }
}
