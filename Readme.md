#External Access to website:
netsh advfirewall firewall add rule name="Functional WebSite - Astro Dev" dir=in action=allow protocol=TCP localport=4321
netsh interface portproxy add v4tov4 listenaddress=0.0.0.0 listenport=4321 connectaddress=127.0.0.1 connectport=4321

#To Remove External Access to Website
netsh advfirewall firewall delete rule name="Functional WebSite - Astro Dev"
netsh interface portproxy delete v4tov4 listenaddress=0.0.0.0 listenport=4321
