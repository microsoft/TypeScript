// @target: esnext
// @useDefineForClassFields: true
declare class Animal {
    sound: string;
}
class Lion extends Animal {
    _sound = 'roar'
    get sound(): string { return this._sound }
    set sound(val: string) { this._sound = val }
}
