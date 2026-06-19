param([int]$Start = 0, [int]$End = 29)
$ErrorActionPreference = "Continue"
$items = @(
  @{ id="proyector-galaxia-aurora"; q="galaxy star projector night light aurora bedroom" },
  @{ id="astronauta-nebulosa";      q="astronaut galaxy projector nebula night light" },
  @{ id="tira-led-reactiva";        q="RGB LED strip lights music sync controller box" },
  @{ id="lampara-luna-levitante";   q="levitating floating moon lamp magnetic" },
  @{ id="lampara-sunset";           q="sunset projection lamp rainbow light" },
  @{ id="pixel-clock";              q="divoom pixel art LED clock display speaker" },
  @{ id="mini-impresora-termica";   q="mini thermal pocket printer portable" },
  @{ id="auriculares-open-ear";     q="open ear clip bluetooth earphones earclip" },
  @{ id="smart-ring";               q="smart ring health tracker fitness titanium" },
  @{ id="ventilador-cuello";        q="bladeless neck fan portable hanging" },
  @{ id="teclado-mini-pastel";      q="pastel mechanical keyboard 60 percent cute" },
  @{ id="maceta-levitante";         q="levitating floating plant pot magnetic bonsai" },
  @{ id="humidificador-llama";      q="flame effect humidifier aroma diffuser fire" },
  @{ id="difusor-volcan";           q="volcano humidifier diffuser flame mist" },
  @{ id="organizador-giratorio";    q="rotating makeup organizer 360 cosmetic storage" },
  @{ id="espejo-hollywood";         q="hollywood vanity mirror led bulbs makeup" },
  @{ id="mantita-nube";             q="cloud fluffy soft throw blanket" },
  @{ id="alfombra-margarita";       q="daisy flower fluffy rug bedroom" },
  @{ id="gua-sha-set";              q="gua sha roller rose quartz set facial" },
  @{ id="ice-roller";               q="ice roller face skincare cooling" },
  @{ id="mascara-led";              q="LED light therapy face mask facial" },
  @{ id="masajeador-cervical";      q="neck massager EMS electric pulse" },
  @{ id="secador-ionico";           q="compact foldable ionic hair dryer travel" },
  @{ id="kit-manicura-gel";         q="gel nail polish UV lamp kit set" },
  @{ id="tote-holografico";         q="holographic tote bag iridescent" },
  @{ id="set-anillos-acero";        q="stainless steel stackable rings set women" },
  @{ id="collar-mariposa";          q="butterfly crystal pendant necklace" },
  @{ id="gafas-y2k";                q="y2k futuristic sunglasses wrap" },
  @{ id="rinonera-cyber";           q="reflective crossbody belt bag techwear" },
  @{ id="beanie-aesthetic";         q="aesthetic knit beanie hat" }
)
for ($i = $Start; $i -le $End -and $i -lt $items.Count; $i++) {
  $it = $items[$i]
  $line = & powershell.exe -NoProfile -ExecutionPolicy Bypass -File "D:\PROYECTO\tikitoki\fetch.ps1" -Id $it.id -Query $it.q
  Write-Output ("[" + $i + "] " + ($line -join " | "))
  Start-Sleep -Seconds 3
}
