git clone https://github.com/VicenteMoreno/intercomcsr-electron.git
cd intercomcsr-electron

sudo apt update
sudo apt install nodejs npm

node -v
npm -v

npm install

Esto lee las dependencias de tu package.json y descarga Electron.
No necesitas hacer npm install electron aparte si ya está en tu package.json.

npm install --save-dev electron-packager

npx electron-packager . IntercomCSR --platform=win32 --arch=x64 --icon=icon.png –overwrite

Explicación de opciones:

    • .: carpeta actual como origen
    • IntercomCSR: nombre del ejecutable
    • --platform=win32: destino Windows
    • --arch=x64: arquitectura 64 bits (compatible con mayoría de PCs modernos)
    • --icon=icon.png: icono personalizado de la app
    • --overwrite: sobreescribe una build anterior si existe
B. Resultado
Esto genera una carpeta llamada IntercomCSR-win32-x64/ (dentro de tu proyecto).
Dentro de esa carpeta estará:
    • IntercomCSR.exe (el portable)
    • todos los archivos de tu app necesarios para funcionar en cualquier Windows

6. Probar y distribuir el portable
    1. Copia la carpeta IntercomCSR-win32-x64 a un PC con Windows.
    2. Ejecuta IntercomCSR.exe y verifica que todo funciona (incluido el icono, la pantalla completa, los selectores y el archivo de configuración).
    3. Puedes distribuir esa carpeta, copiarla a otras salas, etc.
