const imageInput = document.getElementById('image');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const scaleInput = document.getElementById('scale');
const aspectRatioCheckbox = document.getElementById('aspectRatio');
const resizeButton = document.getElementById('resizeButton');
const canvas = document.getElementById('canvas');
const downloadLink = document.getElementById('downloadLink');
let originalWidth, originalHeight;

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (!file) return;

    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
        img.src = e.target.result;
    };

    img.onload = () => {
        originalWidth = img.width;
        originalHeight = img.height;
        widthInput.value = originalWidth;
        heightInput.value = originalHeight;
        resizeButton.disabled = false;
        widthInput.disabled = false;
        heightInput.disabled = false;
    };

    reader.readAsDataURL(file);
});

scaleInput.addEventListener('input', () => {
    const scale = parseInt(scaleInput.value, 10) / 100;
    if (aspectRatioCheckbox.checked) {
        widthInput.value = Math.round(originalWidth * scale);
        heightInput.value = Math.round(originalHeight * scale);
    }
});

widthInput.addEventListener('input', () => {
    if (aspectRatioCheckbox.checked) {
        const ratio = originalHeight / originalWidth;
        heightInput.value = Math.round(widthInput.value * ratio);
    }
});

heightInput.addEventListener('input', () => {
    if (aspectRatioCheckbox.checked) {
        const ratio = originalWidth / originalHeight;
        widthInput.value = Math.round(heightInput.value * ratio);
    }
});

document.getElementById('resizeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
        canvas.width = parseInt(widthInput.value, 10);
        canvas.height = parseInt(heightInput.value, 10);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        downloadLink.href = canvas.toDataURL('image/png');
        downloadLink.download = 'resized-image.png';
        downloadLink.style.display = 'block';
    };

    const reader = new FileReader();
    reader.onload = (event) => {
        img.src = event.target.result;
    };
    reader.readAsDataURL(imageInput.files[0]);
});
