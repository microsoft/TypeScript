//type of 'this' in constructor param list is the class instance type (error)
class ErrClass {
    // Should be an error
    constructor(f = this) { }
}
