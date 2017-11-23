/// <reference path="./core.ts" />
/// <reference path="./utils.ts" />
/// <reference path="./vfs.ts" />

// NOTE: The contents of this file are all exported from the namespace 'typemock'. This is to
//       support the eventual conversion of harness into a modular system.

// typemock library
namespace typemock {
    const module = require("typemock");
    typemock.Arg = module.Arg;
    typemock.Times = module.Times;
    typemock.Mock = module.Mock;
    typemock.Spy = module.Spy;
    typemock.Inject = module.Inject;
    typemock.Timers = module.Timers;
    typemock.spy = module.spy;
}

declare module "typemock_" {
    import * as typemock_ from "typemock";
    global {
        namespace typemock {
            export import Arg = typemock_.Arg;
            export import Times = typemock_.Times;
            export import Mock = typemock_.Mock;
            export import Spy = typemock_.Spy;
            export import Returns = typemock_.Returns;
            export import Throws = typemock_.Throws;
            export import ThisArg = typemock_.ThisArg;
            export import Callback = typemock_.Callback;
            export import Fallback = typemock_.Fallback;
            export import Setup = typemock_.Setup;
            export import Callable = typemock_.Callable;
            export import Constructable = typemock_.Constructable;
            export import Inject = typemock_.Inject;
            export import Timers = typemock_.Timers;
            export import Timer = typemock_.Timer;
            export import Timeout = typemock_.Timeout;
            export import Interval = typemock_.Interval;
            export import Immediate = typemock_.Immediate;
            export import AnimationFrame = typemock_.AnimationFrame;
            export import spy = typemock_.spy;
        }
    }
}