//// [tests/cases/conformance/classes/propertyMemberDeclarations/accessorsOverrideProperty4.ts] ////

//// [accessorsOverrideProperty4.ts]
declare class Animal {
    sound: string;
}
class Lion extends Animal {
    _sound = 'roar'
    get sound(): string { return this._sound }
    set sound(val: string) { this._sound = val }
}


//// [accessorsOverrideProperty4.js]
class Lion extends Animal {
    _sound = 'roar';
    get sound() { return this._sound; }
    set sound(val) { this._sound = val; }
}
