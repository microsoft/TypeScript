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
