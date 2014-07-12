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
