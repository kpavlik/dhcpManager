$adresseReseau = $args[0]
$adresseMac = $args[1]
$adresseIp = $args[2]
$description = $args[3]

echo $adresseMac
Add-DhcpServerv4Reservation -ScopeId $adresseReseau -ClientId $adresseMac -IPAddress $adresseIp -Description $description     