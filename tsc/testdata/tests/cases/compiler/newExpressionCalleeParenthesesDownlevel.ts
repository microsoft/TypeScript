// @target: es2015

class Plugins {
    static Linker = class {};
}

class A {
    #plugins = Plugins;
    static #staticPlugins = Plugins;

    m() {
        new this.#plugins.Linker();
        new this.#plugins["Linker"]();
        new A.#staticPlugins.Linker();
    }
}

class B {
    static Plugins = Plugins;
}

class C extends B {
    static async m(key: "Plugins") {
        new super[key].Linker();
    }
}
