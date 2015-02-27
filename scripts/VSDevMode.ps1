<#
.SYNOPSIS
Run this PowerShell script to enable dev mode and/or a custom script for the TypeScript language service, e.g.

PS C:\> .\scripts\VSDevMode.ps1 -enableDevMode -tsScript C:\src\TypeScript\built\local\

Note: If you get security errors, try running powershell as an Administrator and with the "-executionPolicy remoteSigned" switch

.PARAMETER vsVersion
Set to "12" for Dev12 (VS2013) or "14" (the default) for Dev14 (VS2015)

.PARAMETER enableDevMode
Pass this switch to enable attaching a debugger to the language service

.PARAMETER tsScript
The path to a directory containing a custom language service script to use (typescriptServices.js), e.g. "C:\src\TypeScript\built\local\"
#>
Param(
    [int]$vsVersion = 14,
    [switch]$enableDevMode,
    [string]$tsScript
)

$vsRegKey = "HKCU:\Software\Microsoft\VisualStudio\${vsVersion}.0"
$tsRegKey = "${vsRegKey}\TypeScriptLanguageService"

if($enableDevMode -ne $true -and $tsScript -eq ""){
    Throw "You must either enable language service debugging (-enableDevMode), set a custom script (-tsScript), or both"
}

if(!(Test-Path $vsRegKey)){
    Throw "Visual Studio ${vsVersion} is not installed"
}
if(!(Test-Path $tsRegKey)){
    # Create the TypeScript subkey if it doesn't exist
    New-Item -path $tsRegKey
}

if($tsScript -ne ""){
    $tsScriptServices =  "${tsScript}\typescriptServices.js"
    $tsScriptlib = "${tsScript}\lib.d.ts"
    $tsES6Scriptlib = "${tsScript}\lib.es6.d.ts"
    
    if(!(Test-Path $tsScriptServices)){
        Throw "Could not locate the TypeScript language service script at ${tsScriptServices}"
    }
    else {
        $path = resolve-path ${tsScriptServices}
        Set-ItemProperty -path $tsRegKey -name CustomTypeScriptServicesFileLocation -value "${path}"
        Write-Host "Enabled custom TypeScript language service at ${path} for Dev${vsVersion}"
    }

    if(!(Test-Path $tsScriptlib)){
        Throw "Could not locate the TypeScript default library at ${tsScriptlib}"
    }
    else {
        $path = resolve-path ${tsScriptlib}
        Set-ItemProperty -path $tsRegKey -name CustomDefaultLibraryLocation -value "${path}"
        Write-Host "Enabled custom TypeScript default library at ${path} for Dev${vsVersion}"
    }

    if(!(Test-Path $tsES6Scriptlib)){
        Throw "Could not locate the TypeScript default ES6 library at ${tsES6Scriptlib}"
    }
    else {
        $path = resolve-path ${tsES6Scriptlib}
        Set-ItemProperty -path $tsRegKey -name CustomDefaultES6LibraryLocation -value "${path}"
        Write-Host "Enabled custom TypeScript default ES6 library at ${path} for Dev${vsVersion}"
    }
}

if($enableDevMode){
    Set-ItemProperty -path $tsRegKey -name EnableDevMode -value 1
    Write-Host "Enabled developer mode for Dev${vsVersion}"
}
