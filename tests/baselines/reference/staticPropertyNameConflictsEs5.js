//// [staticPropertyNameConflictsEs5.ts]

// static name
class StaticName {
    static name: number; // error
    name: string; // ok
}

class StaticNameFn {
    static name() {} // error
    name() {} // ok
}


class StaticLength {
    static length: number; // error
    length: string; // ok
}

class StaticLengthFn {
    static length() {} // error
    length() {} // ok
}


class StaticPrototype {
    static prototype: number; // error
    prototype: string; // ok
}

class StaticPrototypeFn {
    static prototype() {} // error
    prototype() {} // ok
}


class StaticCaller {
    static caller: number; // error
    caller: string; // ok
}

class StaticCallerFn {
    static caller() {} // error
    caller() {} // ok
}


class StaticArguments {
    static arguments: number; // error
    arguments: string; // ok
}

class StaticArgumentsFn {
    static arguments() {} // error
    arguments() {} // ok
}


//// [staticPropertyNameConflictsEs5.js]
// static name
var StaticName = (function () {
    function StaticName() {
    }
    return StaticName;
}());
var StaticNameFn = (function () {
    function StaticNameFn() {
    }
    StaticNameFn.name = function () { }; // error
    StaticNameFn.prototype.name = function () { }; // ok
    return StaticNameFn;
}());
var StaticLength = (function () {
    function StaticLength() {
    }
    return StaticLength;
}());
var StaticLengthFn = (function () {
    function StaticLengthFn() {
    }
    StaticLengthFn.length = function () { }; // error
    StaticLengthFn.prototype.length = function () { }; // ok
    return StaticLengthFn;
}());
var StaticPrototype = (function () {
    function StaticPrototype() {
    }
    return StaticPrototype;
}());
var StaticPrototypeFn = (function () {
    function StaticPrototypeFn() {
    }
    StaticPrototypeFn.prototype = function () { }; // error
    StaticPrototypeFn.prototype.prototype = function () { }; // ok
    return StaticPrototypeFn;
}());
var StaticCaller = (function () {
    function StaticCaller() {
    }
    return StaticCaller;
}());
var StaticCallerFn = (function () {
    function StaticCallerFn() {
    }
    StaticCallerFn.caller = function () { }; // error
    StaticCallerFn.prototype.caller = function () { }; // ok
    return StaticCallerFn;
}());
var StaticArguments = (function () {
    function StaticArguments() {
    }
    return StaticArguments;
}());
var StaticArgumentsFn = (function () {
    function StaticArgumentsFn() {
    }
    StaticArgumentsFn.arguments = function () { }; // error
    StaticArgumentsFn.prototype.arguments = function () { }; // ok
    return StaticArgumentsFn;
}());
