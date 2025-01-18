document.getElementById('resizeForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('image');
    const width = parseInt(document.getElementById('width').value, 10);
    const height = parseInt(document.getElementById('height').value, 10);
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    if (!fileInput.files.length || isNaN(width) || isNaN(height)) {
        alert('Please upload an image and provide valid dimensions.');
        return;
    }

    const file = fileInput.files[0];
    const img = new Image();
    const reader = new FileReader();

    reader.onload = function (event) {
        img.src = event.target.result;
    };

    img.onload = function () {
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        const downloadLink = document.getElementById('downloadLink');
        downloadLink.href = canvas.toDataURL();
        downloadLink.download = 'resized-image.png';
        downloadLink.style.display = 'inline-block';
        downloadLink.textContent = 'Download Resized Image';
    };

    reader.readAsDataURL(file);
});
