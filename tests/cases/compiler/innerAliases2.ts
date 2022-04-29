module _provider {
                export class UsefulClass {
                                public foo() {
                                }
                }
}

module consumer {
                import provider = _provider;
                
                var g:provider.UsefulClass= null;
                
                function use():provider.UsefulClass { 
                                var p2:provider.UsefulClass= new provider.UsefulClass();
                                return p2; 
                }
}

