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
Object.defineProperty(exports, "__esModule", { value: true });
var Backbone = require("backbone");
var hoge = new Backbone.Model();
hoge.fetch(null);
