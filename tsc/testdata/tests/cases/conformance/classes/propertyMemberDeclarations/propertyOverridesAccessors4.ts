// @target: es5, es2015
// @useDefineForClassFields: true
declare class Animal {
    get sound(): string
    set sound(val: string)
}
class Lion extends Animal {
    sound = 'RAWR!' // error here
}
