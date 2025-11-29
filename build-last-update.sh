#!/bin/sh
DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
echo "const lastUpdate = new Date('$DATE');" > public/lastUpdate.js
echo "const info = document.createElement('div');" >> public/lastUpdate.js
echo "info.textContent = \`Последнее изменение: \${lastUpdate.toLocaleString()}\`;" >> public/lastUpdate.js
echo "info.className = 'last-update';" >> public/lastUpdate.js
echo "document.body.appendChild(info);" >> public/lastUpdate.js
