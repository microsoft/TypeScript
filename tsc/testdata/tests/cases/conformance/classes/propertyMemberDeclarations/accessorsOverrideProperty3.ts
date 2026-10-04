// @target: esnext
// @useDefineForClassFields: true
declare class Animal {
    sound: string
}
class Lion extends Animal {
    _sound = 'grrr'
    get sound() { return this._sound } // error here
    set sound(val) { this._sound = val }
}
