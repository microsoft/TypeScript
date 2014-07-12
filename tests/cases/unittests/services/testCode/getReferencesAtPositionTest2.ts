var remoteglobalVar: number = 2;

class remotefooCls {
    //Declare
    remoteclsVar = 1;
    static remoteclsSVar = 1;

    constructor (public remoteclsParam: number) {
        //Increments
        remoteglobalVar++;
        this.remoteclsVar++;
        remotefooCls.remoteclsSVar++;
        this.remoteclsParam++;
        remotemodTest.remotemodVar++;
    }
}

function remotefoo(remotex: number) {
    //Declare 
    var remotefnVar = 1;
    
    //Increments
    remotefooCls.remoteclsSVar++;
    remoteglobalVar++;
    remotemodTest.remotemodVar++;
    remotefnVar++;
    
    //Return
    return remotex++;
}

module remotemodTest {
    //Declare
    export var remotemodVar:number;
    
    //Increments
    remoteglobalVar++;
    remotefooCls.remoteclsSVar++;
    remotemodVar++;
    
    class remotetestCls {
        static remoteboo = remotefoo;
    }
    
    function remotetestFn(){
        static remoteboo = remotefoo;
        
        //Increments
        remoteglobalVar++;
        remotefooCls.remoteclsSVar++;
        remotemodVar++;
    }
    
    module remotetestMod {
        var remoteboo = remotefoo;
    }
}


