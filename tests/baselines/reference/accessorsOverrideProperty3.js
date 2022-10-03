//// [accessorsOverrideProperty3.ts]
declare class Animal {
    sound: string
}
class Lion extends Animal {
    _sound = 'grrr'
    get sound() { return this._sound } // error here
    set sound(val) { this._sound = val }
}


//// [accessorsOverrideProperty3.js]
class Lion extends Animal {
    _sound = 'grrr';
    get sound() { return this._sound; } // error here
    set sound(val) { this._sound = val; }
}
