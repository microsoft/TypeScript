// @lib: es6
namespace NS { 
    export const x = Symbol();

    class NotTransformed { 
        [NS.x]: number;
    }
}
