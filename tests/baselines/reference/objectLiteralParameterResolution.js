//// [objectLiteralParameterResolution.ts]
interface Foo{
    extend<T>(target: T, ...objs: any[]): T;
    extend<T>(deep: boolean, target: T, ...objs: any[]): T;
}
declare var $: Foo;
var s = $.extend({
    type: "GET" ,
    data: "data" ,
    success: wrapSuccessCallback(requestContext, callback) ,
    error: wrapErrorCallback(requestContext, errorCallback) ,
    dataType: "json" ,
    converters: { "text json": "" },
    traditional: true ,
    timeout: 12,
    }, "");


//// [objectLiteralParameterResolution.js]
var s = $.extend({
    type: "GET",
    data: "data",
    success: wrapSuccessCallback(requestContext, callback),
    error: wrapErrorCallback(requestContext, errorCallback),
    dataType: "json",
    converters: { "text json": "" },
    traditional: true,
    timeout: 12
}, "");
