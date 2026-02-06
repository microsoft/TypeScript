//// [tests/cases/compiler/stackDepthLimitCastingType.ts] ////

//// [index.d.ts]
declare global {
    interface JQueryXHR { }
    class Model<T = any, E = {}> {
        initialize(attributes?: T, options?: CombinedModelConstructorOptions<E, this>): void;
        fetch(options?: any): JQueryXHR;
    }
    interface ModelConstructorOptions<TModel extends Model = Model> {
        collection?: Collection<TModel>;
    }
    class Collection<TModel extends Model = Model> {
        without(...values: TModel[]): TModel[];
    }
    type CombinedModelConstructorOptions<E, M extends Model<any, E> = Model> = ModelConstructorOptions<M> & E;
}

export {
    Model
};
export as namespace Backbone;

//// [index.d.ts]
import * as Backbone from "backbone";
declare module "backbone" {
    interface ModelWithCache extends Model {
        fetch(options?: any): JQueryXHR;
    }
}
export {};
export as namespace BackboneFetchCache;

//// [index.ts]
import * as Backbone from "backbone";
import * as BackboneFetchCache from "backbone-fetch-cache";


const hoge = new Backbone.Model() as Backbone.ModelWithCache;
hoge.fetch(null as any);

//// [index.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const Backbone = __importStar(require("backbone"));
const hoge = new Backbone.Model();
hoge.fetch(null);
