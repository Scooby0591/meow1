const cameraButton = document.getElementById('cameraPermission');
const video = document.getElementById('video');
const flashButton = document.getElementById('flashlightToggle');
const uploadButton = document.getElementById('uploadButton');
const fileInput = document.getElementById('fileInput');
let stream, track;

cameraButton.addEventListener('click', async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        video.srcObject = stream;
        video.play();
        video.style.display = 'block';
        cameraButton.style.display = 'none';
        flashButton.style.display = 'inline-block';
        track = stream.getVideoTracks()[0];
    } catch (error) {
        alert('Camera access denied or not available');
    }
});

flashButton.addEventListener('click', () => {
    if (track) {
        const capabilities = track.getCapabilities();
        if (capabilities.torch) {
            track.applyConstraints({ advanced: [{ torch: true }] });
        }
    }
});

uploadButton.addEventListener('click', () => {
    fileInput.click();
});

function copyURL() {
    const urlBox = document.getElementById('urlBox');
    urlBox.select();
    document.execCommand('copy');
}