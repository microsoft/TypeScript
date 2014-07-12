module modTest {
    //Declare
    export var modVar:number;
    ^^

    //Increments
    modVar++;
    
    class testCls{
        ^^
    }
    
    function testFn(){
        //Increments
        modVar++;
    }  ^^
^^    
    module testMod {
    }
}
