param(
  [switch]$Deploy
)

$ErrorActionPreference = "Stop"

$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$MkDocsConfig = Join-Path $ProjectRoot "mkdocs.yml"
$Python = "C:\Users\user\.venv\Scripts\python.exe"

if (-not (Test-Path -LiteralPath $MkDocsConfig)) {
  throw "MkDocs config not found: $MkDocsConfig"
}

if (-not (Test-Path -LiteralPath $Python)) {
  throw "Python not found: $Python"
}

Write-Host "Project root: $ProjectRoot"
Write-Host "MkDocs config: $MkDocsConfig"

& $Python -m mkdocs build --strict -f $MkDocsConfig

if ($Deploy) {
  & $Python -m mkdocs gh-deploy -f $MkDocsConfig
} else {
  Write-Host "Build completed. To deploy after confirmation, run: .\deploy.ps1 -Deploy"
}
