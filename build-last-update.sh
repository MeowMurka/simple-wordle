#!/bin/sh
DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
echo "const lastUpdate = new Date('$DATE');" > lastUpdate.js
echo "const info = document.createElement('div'); info.textContent = \`Последнее изменение: \${lastUpdate.toLocaleString()}\`; info.className = 'last-update'; document.body.appendChild(info);" >> lastUpdate.js
