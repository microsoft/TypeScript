
declare namespace Q {
    function _try(method: Function, ...args: any[]): any;
    export { _try as try };
}

Q.try(() => { });

