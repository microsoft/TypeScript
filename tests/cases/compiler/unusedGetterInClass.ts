//@target: ES5
//@noUnusedLocals:true
//@noUnusedParameters:true

class Employee {
    private _fullName: string;

    private get fullName(): string {
        return this._fullName;
    }
    private set setter(_: string) {}
}