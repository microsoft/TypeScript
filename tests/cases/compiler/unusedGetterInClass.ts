//@target: ES5
//@noUnusedLocals:true
//@noUnusedParameters:true

class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }
}