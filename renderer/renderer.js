const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, '..', 'config.json');

const advertenciaEl = document.getElementById('advertencia');
const siteNameEl = document.getElementById('site-name');
const inSelect = document.getElementById('audio-in');
const outSelect = document.getElementById('audio-out');
const frameEl = document.getElementById('intercom-frame');

let config = {
    server_ip: '',
    site_name: '',
    audio_in: '',
    audio_out: ''
};

// Cargar configuración
function cargaConfig() {
    if (fs.existsSync(configPath)) {
        try {
            const raw = fs.readFileSync(configPath);
            config = JSON.parse(raw);
            siteNameEl.textContent = config.site_name || "CSR";
            frameEl.src = `https://${config.server_ip}/`;
        } catch (e) {
            siteNameEl.textContent = 'CSR';
            advertenciaEl.textContent = 'No se pudo leer config.json';
            advertenciaEl.classList.remove('hidden');
        }
    } else {
        siteNameEl.textContent = 'CSR';
        advertenciaEl.textContent = 'Falta el archivo config.json';
        advertenciaEl.classList.remove('hidden');
    }
}
cargaConfig();

// Listar dispositivos de audio
async function listarDispositivos() {
    let devices = await navigator.mediaDevices.enumerateDevices();
    let inOpts = '<option value="">Selecciona...</option>';
    let outOpts = '<option value="">Selecciona...</option>';
    let micFound = false, spkFound = false;

    devices.forEach(dev => {
        if (dev.kind === 'audioinput') {
            inOpts += `<option value="${dev.deviceId}"${config.audio_in===dev.deviceId?' selected':''}>${dev.label || '(Micrófono)'}</option>`;
            if (config.audio_in===dev.deviceId) micFound=true;
        }
        if (dev.kind === 'audiooutput') {
            outOpts += `<option value="${dev.deviceId}"${config.audio_out===dev.deviceId?' selected':''}>${dev.label || '(Altavoz)'}</option>`;
            if (config.audio_out===dev.deviceId) spkFound=true;
        }
    });

    inSelect.innerHTML = inOpts;
    outSelect.innerHTML = outOpts;

    // Advertencia si no está seleccionado
    advertenciaEl.classList.add('hidden');
    if (!micFound || !spkFound) {
        advertenciaEl.textContent = "Debe seleccionar tanto dispositivo de entrada como de salida para poder iniciar comunicación";
        advertenciaEl.classList.remove('hidden');
    }
}
listarDispositivos();

// Guardar selección en config.json
inSelect.onchange = () => {
    config.audio_in = inSelect.value;
    guardaConfig();
    listarDispositivos();
};
outSelect.onchange = () => {
    config.audio_out = outSelect.value;
    guardaConfig();
    listarDispositivos();
};

function guardaConfig() {
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
}
