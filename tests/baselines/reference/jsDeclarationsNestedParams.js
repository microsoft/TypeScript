//// [file.js]
class X {
    /**
      * Cancels the request, sending a cancellation to the other party
      * @param {Object} error __auto_generated__
      * @param {string?} error.reason the error reason to send the cancellation with
      * @param {string?} error.code the error code to send the cancellation with
      * @returns {Promise.<*>} resolves when the event has been sent.
      */ 
    async cancel({reason, code}) {}
}

class Y {
    /**
      * Cancels the request, sending a cancellation to the other party
      * @param {Object} error __auto_generated__
      * @param {string?} error.reason the error reason to send the cancellation with
      * @param {Object} error.suberr
      * @param {string?} error.suberr.reason the error reason to send the cancellation with
      * @param {string?} error.suberr.code the error code to send the cancellation with
      * @returns {Promise.<*>} resolves when the event has been sent.
      */ 
    async cancel({reason, suberr}) {}
}


//// [file.js]
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class X {
    /**
      * Cancels the request, sending a cancellation to the other party
      * @param {Object} error __auto_generated__
      * @param {string?} error.reason the error reason to send the cancellation with
      * @param {string?} error.code the error code to send the cancellation with
      * @returns {Promise.<*>} resolves when the event has been sent.
      */
    cancel({ reason, code }) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}
class Y {
    /**
      * Cancels the request, sending a cancellation to the other party
      * @param {Object} error __auto_generated__
      * @param {string?} error.reason the error reason to send the cancellation with
      * @param {Object} error.suberr
      * @param {string?} error.suberr.reason the error reason to send the cancellation with
      * @param {string?} error.suberr.code the error code to send the cancellation with
      * @returns {Promise.<*>} resolves when the event has been sent.
      */
    cancel({ reason, suberr }) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
}


//// [file.d.ts]
declare class X {
    /**
      * Cancels the request, sending a cancellation to the other party
      * @param {Object} error __auto_generated__
      * @param {string?} error.reason the error reason to send the cancellation with
      * @param {string?} error.code the error code to send the cancellation with
      * @returns {Promise.<*>} resolves when the event has been sent.
      */
    cancel({ reason, code }: {
        reason: string | null;
        code: string | null;
    }): Promise<any>;
}
declare class Y {
    /**
      * Cancels the request, sending a cancellation to the other party
      * @param {Object} error __auto_generated__
      * @param {string?} error.reason the error reason to send the cancellation with
      * @param {Object} error.suberr
      * @param {string?} error.suberr.reason the error reason to send the cancellation with
      * @param {string?} error.suberr.code the error code to send the cancellation with
      * @returns {Promise.<*>} resolves when the event has been sent.
      */
    cancel({ reason, suberr }: {
        reason: string | null;
        suberr: {
            reason: string | null;
            code: string | null;
        };
    }): Promise<any>;
}
