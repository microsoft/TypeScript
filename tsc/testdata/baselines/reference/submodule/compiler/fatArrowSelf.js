//// [tests/cases/compiler/fatArrowSelf.ts] ////

//// [fatArrowSelf.ts]
namespace Events {
    export interface ListenerCallback {
        (value:any):void;
    }
    export class EventEmitter {
         public addListener(type:string, listener:ListenerCallback) {
         }
    }
}

namespace Consumer {
    class EventEmitterConsummer {
        constructor (private emitter: Events.EventEmitter) { }

        private register() {
            this.emitter.addListener('change', (e) => {
                this.changed();
            });
        }      

        private changed() {
        }
    }
}

//// [fatArrowSelf.js]
"use strict";
var Events;
(function (Events) {
    class EventEmitter {
        addListener(type, listener) {
        }
    }
    Events.EventEmitter = EventEmitter;
})(Events || (Events = {}));
var Consumer;
(function (Consumer) {
    class EventEmitterConsummer {
        emitter;
        constructor(emitter) {
            this.emitter = emitter;
        }
        register() {
            this.emitter.addListener('change', (e) => {
                this.changed();
            });
        }
        changed() {
        }
    }
})(Consumer || (Consumer = {}));
