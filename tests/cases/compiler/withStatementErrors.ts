declare var ooo:any;

with (ooo.eee.oo.ah_ah.ting.tang.walla.walla) { // error
    bing = true; // no error
    bang = true; // no error
    
    function bar() {} // no error

    bar(); // no error

    class C {} // error   
    
    interface I {} // error
    
    namespace M {} // error
        
}
