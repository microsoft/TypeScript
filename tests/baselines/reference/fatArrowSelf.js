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
    class EventEmitterConsumer {
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
    var EventEmitter = (function () {
        function EventEmitter() {
        }
        EventEmitter.prototype.addListener = function (type, listener) {
        };
        return EventEmitter;
    }());
    Events.EventEmitter = EventEmitter;
})(Events || (Events = {}));
var Consumer;
(function (Consumer) {
    var EventEmitterConsumer = (function () {
        function EventEmitterConsumer(emitter) {
            this.emitter = emitter;
        }
        EventEmitterConsumer.prototype.register = function () {
            var _this = this;
            this.emitter.addListener('change', function (e) {
                _this.changed();
            });
        };
        EventEmitterConsumer.prototype.changed = function () {
        };
        return EventEmitterConsumer;
    }());
})(Consumer || (Consumer = {}));
