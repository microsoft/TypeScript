//@target: ES5, ES2015
//@noUnusedLocals:true
//@noUnusedParameters:true

class Employee {
    private _fullName: string;

    private set fullName(newName: string) {
        this._fullName = newName;
    }
}