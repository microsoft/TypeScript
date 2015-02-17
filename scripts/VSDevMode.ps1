<#
.SYNOPSIS
Run this PowerShell script to enable dev mode and/or a custom script for the TypeScript language service, e.g.

PS C:\> .\scripts\VSDevMode.ps1 -enableDevMode -tsScript C:\src\TypeScript\built\local\typescriptServices.js

Note: If you get security errors, try running powershell as an Administrator and with the "-executionPolicy remoteSigned" switch

.PARAMETER vsVersion
Set to "12" for Dev12 (VS2013) or "14" (the default) for Dev14 (VS2015)

.PARAMETER enableDevMode
Pass this switch to enable attaching a debugger to the language service

.PARAMETER tsScript
The path to a custom language service script to use, e.g. "C:\src\TypeScript\built\local\typescriptServices.js"
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
    if(!(Test-Path $tsScript)){
        Throw "Could not locate the TypeScript language service script at ${tsScript}"
    }
    Set-ItemProperty -path $tsRegKey -name CustomTypeScriptServicesFileLocation -value "${tsScript}"
    Write-Host "Enabled custom TypeScript language service at ${tsScript} for Dev${vsVersion}"
}
if($enableDevMode){
    Set-ItemProperty -path $tsRegKey -name EnableDevMode -value 1
    Write-Host "Enabled developer mode for Dev${vsVersion}"
}
