by: [saitodisse](http://saitodisse.github.io/)

# Local Music Party
- Provide all your songs on local LAN.
- Search your mp3 with an elastic-search database

####Installation instructions
 - Install node.js
 - Install java
 - Install elastic search

Install this package:
```
sudo npm i grunt-cli -g
```

###### Clone all
```
git clone git@github.com:saitodisse/elastic-root.git
cd elastic-root
bash cloneAll.sh
```

###### npm install
```
bash npmInstallAll.sh
```


![music party diagram](https://docs.google.com/drawings/d/1s1pn9j1HyYyN4xdEJo8707BzDixOZsyC4k3o6BRixFg/pub?w=720&amp;h=540 "music party diagram")


#### [Login and Socket.IO Server](https://github.com/saitodisse/socket-io-server)(9003)

 - sets room name
 - provide links to [Player](https://github.com/saitodisse/elastic-player) and [Music Searcher](https://github.com/saitodisse/elastic-music-searcher)

###### TODO
 - facebook login




#### [Player](https://github.com/saitodisse/elastic-player)(9001)

 - basic HTML5 player with controls
 - has a playlist
 - buttons previous and next
 - accepts his music

###### TODO
 - remote control of another player




#### [Searcher](https://github.com/saitodisse/elastic-music-searcher)(9002)

 - finds music on elastic search database
 - can preview songs (tiny play button)
 - dropdown to select a player
 - send a song to a player

###### TODO
 - send entire album





#### [Music Server](https://github.com/saitodisse/elastic-music-server)(9004)

![music server diagram](https://docs.google.com/drawings/d/1HnM9_fhsr1D2oaUNB0ZZvwAL1b-kmwCpQYscUp63L1Y/pub?w=480&amp;h=360 "Music Server Diagram")

 - Serves music files with CORS enabled

###### TODO
 - Search for local folders
 - Select a local folder
 - Start discovery for new files
 - List monitored folder
 - Save monitored folder
 - Delete monitored folder
 - Clean all database of musics
 - Will check what folder still exists and remove files that does not exist any more
 - Include new files only if it was not included before
 - Get mp3/flac info from the files to save on elastic search database
 - linux: mount drive if is not mounted
