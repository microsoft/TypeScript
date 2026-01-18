namespace a{
       var x:number;
       namespace b{
               var y = x; // should not be an error
       }
}