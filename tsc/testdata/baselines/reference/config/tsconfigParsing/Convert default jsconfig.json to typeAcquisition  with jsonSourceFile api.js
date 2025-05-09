Fs::
//// [/apath/a.ts]


//// [/apath/b.ts]


//// [/apath/jsconfig.json]
{}


configFileName:: jsconfig.json
CompilerOptions::
{
  "allowJs": true,
  "allowSyntheticDefaultImports": true,
  "noEmit": true,
  "skipLibCheck": true,
  "maxNodeModuleJsDepth": 2,
  "configFilePath": "/apath/jsconfig.json"
}

TypeAcquisition::
{
  "enable": true
}

FileNames::
/apath/a.ts,/apath/b.ts
Errors::

