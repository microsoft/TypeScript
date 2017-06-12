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
    var EventEmitter = (function () {
        function EventEmitter() {
        }
        var proto_1 = EventEmitter.prototype;
        proto_1.addListener = function (type, listener) {
        };
        return EventEmitter;
    }());
    Events.EventEmitter = EventEmitter;
})(Events || (Events = {}));
var Consumer;
(function (Consumer) {
    var EventEmitterConsummer = (function () {
        function EventEmitterConsummer(emitter) {
            this.emitter = emitter;
        }
        var proto_2 = EventEmitterConsummer.prototype;
        proto_2.register = function () {
            var _this = this;
            this.emitter.addListener('change', function (e) {
                _this.changed();
            });
        };
        proto_2.changed = function () {
        };
        return EventEmitterConsummer;
    }());
})(Consumer || (Consumer = {}));
