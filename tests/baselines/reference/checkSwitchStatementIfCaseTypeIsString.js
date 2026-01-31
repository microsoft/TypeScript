//// [tests/cases/compiler/checkSwitchStatementIfCaseTypeIsString.ts] ////

//// [checkSwitchStatementIfCaseTypeIsString.ts]
declare function use(a: any): void;

class A {
    doIt(x: Array<string>): void {
        x.forEach((v) => {
            switch(v) {
                case "test": use(this);
            }
        });
    }
}

//// [checkSwitchStatementIfCaseTypeIsString.js]
class A {
    doIt(x) {
        x.forEach((v) => {
            switch (v) {
                case "test": use(this);
            }
        });
    }
}
