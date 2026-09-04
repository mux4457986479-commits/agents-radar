param([switch]$AsJson)
$ErrorActionPreference = 'Stop'
$repo = 'mux4457986479-commits/agents-radar'
$relative = 'digests/ai-repo-picks-latest.json'
$url = "https://raw.githubusercontent.com/$repo/master/$relative"
try {
    $report = Invoke-RestMethod -Uri ($url + '?t=' + [DateTimeOffset]::UtcNow.ToUnixTimeSeconds()) -TimeoutSec 30
} catch {
    if (-not (Get-Command gh -ErrorAction SilentlyContinue)) { throw }
    if (-not $env:GH_CONFIG_DIR -and (Test-Path -LiteralPath 'D:\学习\AI\CodexWorkspace\trst\.codex\.gh-config')) {
        $env:GH_CONFIG_DIR = 'D:\学习\AI\CodexWorkspace\trst\.codex\.gh-config'
    }
    $json = gh api "repos/$repo/contents/$relative" -H 'Accept: application/vnd.github.raw+json'
    if ($LASTEXITCODE -ne 0) { throw 'Unable to retrieve the latest AI repository report.' }
    $report = ($json -join "`n") | ConvertFrom-Json
}
if ($report -is [string]) { $report = $report | ConvertFrom-Json }
if ($report.schemaVersion -ne 1 -or @($report.repos).Count -ne 10) { throw 'Invalid or incomplete report; expected ten verified repositories.' }
$today = [DateTimeOffset]::UtcNow.ToOffset([TimeSpan]::FromHours(8)).ToString('yyyy-MM-dd')
if ($AsJson) {
    $report | Add-Member -NotePropertyName isStale -NotePropertyValue ($report.date -ne $today) -Force
    $report | ConvertTo-Json -Depth 15
    exit
}
"报告日期：$($report.date)；采集时间：$($report.generatedAt)"
if ($report.date -ne $today) { "注意：报告不是今天的，今日日期为 $today。" }
$report.scope
"| 排名 | 仓库 | 今日新增 Stars | 功能 | 配置建议 |"
"| ---: | :--- | ---: | :--- | :--- |"
$index = 0
foreach ($item in $report.repos) {
    $index++
    $summary = $item.summary -replace '[\r\n|]', ' '
    $note = "$($item.verdict)：$($item.reason)；$($item.requirements)；$($item.overlap)" -replace '[\r\n|]', ' '
    "| $index | [$($item.fullName)]($($item.url)) | $($item.todayStars) | $summary | $note |"
}
if (@($report.failedSources).Count -gt 0) { "部分来源未能读取，详见报告 failedSources。" }
