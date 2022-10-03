// Ensure only checking for const declarations shadowed by vars
class Rule {
    public regex: RegExp = new RegExp('');
    public name: string = '';

    constructor(name: string) {
        this.name = name;
    }
}