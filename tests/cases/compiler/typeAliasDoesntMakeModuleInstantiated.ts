declare namespace m {
    // type alias declaration here shouldnt make the module declaration instantiated
    type Selector = string| string[] |Function;

    export interface IStatic {
        (selector: any /* Selector */): IInstance;
    }
    export interface IInstance { }
}
declare var m: m.IStatic; // Should be ok to have var 'm' as module is non instantiated