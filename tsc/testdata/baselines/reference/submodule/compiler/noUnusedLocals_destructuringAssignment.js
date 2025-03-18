//// [tests/cases/compiler/noUnusedLocals_destructuringAssignment.ts] ////

//// [noUnusedLocals_destructuringAssignment.ts]
class C {
    private x = 0;

    m(): number {
        let x: number;
        ({ x } = this);
        return x;
    }

    private f(): Function {
        let f: Function;
        ({ f } = this);
        return f;
    }
}


//// [noUnusedLocals_destructuringAssignment.js]
class C {
    x = 0;
    m() {
        let x;
        ({ x } = this);
        return x;
    }
    f() {
        let f;
        ({ f } = this);
        return f;
    }
}
