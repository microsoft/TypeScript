//// [tests/cases/compiler/thisCapture1.ts] ////

//// [thisCapture1.ts]
class X {
    private y = 0;
    public getSettings(keys: string[]): any {
        var ret: any;
        return ret.always(() => {
            this.y = 0;
        }).promise();
    }
}

//// [thisCapture1.js]
class X {
    y = 0;
    getSettings(keys) {
        var ret;
        return ret.always(() => {
            this.y = 0;
        }).promise();
    }
}
