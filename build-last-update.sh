#!/bin/sh
# Генерируем lastUpdate.js с текущей датой сборки
DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
echo "const lastUpdate = new Date('$DATE');" > lastUpdate.js
echo "const info = document.createElement('div');" >> lastUpdate.js
echo "info.textContent = \`Последнее изменение: \${lastUpdate.toLocaleString()}\`;" >> lastUpdate.js
echo "info.className = 'last-update';" >> lastUpdate.js
echo "document.body.appendChild(info);" >> lastUpdate.js
