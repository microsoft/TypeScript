//// [registryMonoidalPatternNoOOM.ts]
interface Plugins<TConfig> {}

type PluginNames = keyof Plugins<any>;

interface MiddlewarePlugin<TKind extends PluginNames, TPreviousConfig> {
    readonly _group: TKind;
    configure<TConfig>(cb: (conf: TPreviousConfig) => TConfig): Plugins<TConfig>[TKind];
    // combine<TConfig>(cb: Plugins<(conf: TPreviousConfig) => TConfig>[TKind]): Plugins<TConfig>[TKind];
    // The above "works", but the below _should_ result in less to check and is simpler (and is needed to trigger the OOM bug)
    combine<TConfig>(cb: MiddlewarePlugin<TKind, (conf: TPreviousConfig) => TConfig>): Plugins<TConfig>[TKind];
}

const GroupOneName = "GroupOne";
type GroupOneName = typeof GroupOneName;
type GroupOne<T> = PluginA<T> | PluginB<T>;
interface Plugins<TConfig> {
    [GroupOneName]: GroupOne<TConfig>;
}
class PluginA<TConf> implements MiddlewarePlugin<GroupOneName, TConf> {
    readonly _kind = "PluginA";
    readonly _group = GroupOneName;
    constructor(public value: TConf) {}
    configure<T>(cb: (conf: TConf) => T): GroupOne<T> {
        return new PluginA(cb(this.value));
    }
    combine<T>(plug: GroupOne<(conf: TConf) => T>): GroupOne<T> {
        return plug.configure(f => f(this.value));
    }
}

class PluginB<TConf> implements MiddlewarePlugin<GroupOneName, TConf> {
    readonly _kind = "PluginB";
    readonly _group = GroupOneName;
    constructor(public value: TConf) {}
    configure<T>(cb: (conf: TConf) => T): GroupOne<T> {
        return new PluginB(cb(this.value));
    }
    combine<T>(plug: GroupOne<(conf: TConf) => T>): GroupOne<T> {
        return plug.configure(f => f(this.value));
    }
}

// One plugin group isn't quite enough to run OOM - we need a few more

const GroupTwoName = "GroupTwo";
type GroupTwoName = typeof GroupTwoName;
type GroupTwo<T> = PluginC<T> | PluginD<T>;
interface Plugins<TConfig> {
    [GroupTwoName]: GroupTwo<TConfig>;
}
class PluginC<TConf> implements MiddlewarePlugin<GroupTwoName, TConf> {
    readonly _kind = "PluginC";
    readonly _group = GroupTwoName;
    constructor(public value: TConf) {}
    configure<T>(cb: (conf: TConf) => T): GroupTwo<T> {
        return new PluginC(cb(this.value));
    }
    combine<T>(plug: GroupTwo<(conf: TConf) => T>): GroupTwo<T> {
        return plug.configure(f => f(this.value));
    }
}

class PluginD<TConf> implements MiddlewarePlugin<GroupTwoName, TConf> {
    readonly _kind = "PluginD";
    readonly _group = GroupTwoName;
    constructor(public value: TConf) {}
    configure<T>(cb: (conf: TConf) => T): GroupTwo<T> {
        return new PluginD(cb(this.value));
    }
    combine<T>(plug: GroupTwo<(conf: TConf) => T>): GroupTwo<T> {
        return plug.configure(f => f(this.value));
    }
}

const GroupThreeName = "GroupThree";
type GroupThreeName = typeof GroupThreeName;
type GroupThree<T> = PluginE<T> | PluginF<T>;
interface Plugins<TConfig> {
    [GroupThreeName]: GroupThree<TConfig>;
}
class PluginE<TConf> implements MiddlewarePlugin<GroupThreeName, TConf> {
    readonly _kind = "PluginC";
    readonly _group = GroupThreeName;
    constructor(public value: TConf) {}
    configure<T>(cb: (conf: TConf) => T): GroupThree<T> {
        return new PluginE(cb(this.value));
    }
    combine<T>(plug: GroupThree<(conf: TConf) => T>): GroupThree<T> {
        return plug.configure(f => f(this.value));
    }
}

class PluginF<TConf> implements MiddlewarePlugin<GroupThreeName, TConf> {
    readonly _kind = "PluginD";
    readonly _group = GroupThreeName;
    constructor(public value: TConf) {}
    configure<T>(cb: (conf: TConf) => T): GroupThree<T> {
        return new PluginF(cb(this.value));
    }
    combine<T>(plug: GroupThree<(conf: TConf) => T>): GroupThree<T> {
        return plug.configure(f => f(this.value));
    }
}


//// [registryMonoidalPatternNoOOM.js]
var GroupOneName = "GroupOne";
var PluginA = /** @class */ (function () {
    function PluginA(value) {
        this.value = value;
        this._kind = "PluginA";
        this._group = GroupOneName;
    }
    PluginA.prototype.configure = function (cb) {
        return new PluginA(cb(this.value));
    };
    PluginA.prototype.combine = function (plug) {
        var _this = this;
        return plug.configure(function (f) { return f(_this.value); });
    };
    return PluginA;
}());
var PluginB = /** @class */ (function () {
    function PluginB(value) {
        this.value = value;
        this._kind = "PluginB";
        this._group = GroupOneName;
    }
    PluginB.prototype.configure = function (cb) {
        return new PluginB(cb(this.value));
    };
    PluginB.prototype.combine = function (plug) {
        var _this = this;
        return plug.configure(function (f) { return f(_this.value); });
    };
    return PluginB;
}());
// One plugin group isn't quite enough to run OOM - we need a few more
var GroupTwoName = "GroupTwo";
var PluginC = /** @class */ (function () {
    function PluginC(value) {
        this.value = value;
        this._kind = "PluginC";
        this._group = GroupTwoName;
    }
    PluginC.prototype.configure = function (cb) {
        return new PluginC(cb(this.value));
    };
    PluginC.prototype.combine = function (plug) {
        var _this = this;
        return plug.configure(function (f) { return f(_this.value); });
    };
    return PluginC;
}());
var PluginD = /** @class */ (function () {
    function PluginD(value) {
        this.value = value;
        this._kind = "PluginD";
        this._group = GroupTwoName;
    }
    PluginD.prototype.configure = function (cb) {
        return new PluginD(cb(this.value));
    };
    PluginD.prototype.combine = function (plug) {
        var _this = this;
        return plug.configure(function (f) { return f(_this.value); });
    };
    return PluginD;
}());
var GroupThreeName = "GroupThree";
var PluginE = /** @class */ (function () {
    function PluginE(value) {
        this.value = value;
        this._kind = "PluginC";
        this._group = GroupThreeName;
    }
    PluginE.prototype.configure = function (cb) {
        return new PluginE(cb(this.value));
    };
    PluginE.prototype.combine = function (plug) {
        var _this = this;
        return plug.configure(function (f) { return f(_this.value); });
    };
    return PluginE;
}());
var PluginF = /** @class */ (function () {
    function PluginF(value) {
        this.value = value;
        this._kind = "PluginD";
        this._group = GroupThreeName;
    }
    PluginF.prototype.configure = function (cb) {
        return new PluginF(cb(this.value));
    };
    PluginF.prototype.combine = function (plug) {
        var _this = this;
        return plug.configure(function (f) { return f(_this.value); });
    };
    return PluginF;
}());
