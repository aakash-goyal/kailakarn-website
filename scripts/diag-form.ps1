$body = @{
    "entry.2005620554" = "Test Diagnostic"
    "entry.1045781291" = "test@example.com"
    "entry.1166974658" = "9876543210"
    "entry.2034717969" = "Build Your Brand"
    "entry.839337160"  = "Diagnostic check from PowerShell"
}

$url = "https://docs.google.com/forms/d/e/1FAIpQLSfnvvCgOQtjv0NbYXJxP4vpuVzacqZtXoo3R04u7SAUTe_Maw/formResponse"
$r = Invoke-WebRequest -Uri $url -Method POST -Body $body -UseBasicParsing -MaximumRedirection 5 -TimeoutSec 30 -ContentType 'application/x-www-form-urlencoded'

Write-Host "Final URL: $($r.BaseResponse.ResponseUri.AbsoluteUri)"
Write-Host "Content size: $($r.Content.Length)"
Write-Host ""

$patterns = @('error','captcha','reCAPTCHA','sign in','signin','requireLogin','must respond','required question','only one response','closed','no longer accepting','public access','restricted','submission disabled','disabled')
foreach ($p in $patterns) {
    if ($r.Content -match $p) {
        $idx = $r.Content.IndexOf($p)
        $start = [Math]::Max(0, $idx - 120)
        $len = [Math]::Min(280, $r.Content.Length - $start)
        $snip = $r.Content.Substring($start, $len) -replace '<[^>]+>', ' ' -replace '\s+', ' '
        Write-Host "HIT: $p"
        Write-Host "    $snip"
        Write-Host ""
    }
}
