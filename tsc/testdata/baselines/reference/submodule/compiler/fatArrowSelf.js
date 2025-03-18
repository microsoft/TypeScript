//// [tests/cases/compiler/fatArrowSelf.ts] ////

//// [fatArrowSelf.ts]
module Events {
    export interface ListenerCallback {
        (value:any):void;
    }
    export class EventEmitter {
         public addListener(type:string, listener:ListenerCallback) {
         }
    }
}

module Consumer {
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
