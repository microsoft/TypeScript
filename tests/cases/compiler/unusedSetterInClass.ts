//@target: ES5
//@noUnusedLocals:true
//@noUnusedParameters:true

class Employee {
    private _fullName: string;

    set fullName(newName: string) {
        this._fullName = newName;
    }
}