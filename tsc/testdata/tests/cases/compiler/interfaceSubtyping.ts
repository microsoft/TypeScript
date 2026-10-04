// @target: es2015
interface iface {
    foo(): void;
}
class Camera implements iface{
    constructor (public str: string) {
    }
    foo() {  return "s";   }
}
