//@target: ES5
//@noUnusedLocals:true
//@noUnusedParameters:true

class Employee {
    private _fullName: string;

    private get fullName(): string {
        return this._fullName;
    }
    // Will not also error on the setter
    private set fullName(_: string) {}
}