import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true }); // Enable detailed logs
const status = document.getElementById('status');
const downloadLink = document.getElementById('downloadLink');

document.getElementById('resizeButton').addEventListener('click', async () => {
  const videoInput = document.getElementById('videoInput').files[0];

  console.log('Video input detected:', videoInput);

  if (!videoInput) {
    alert('Please select a video file.');
    return;
  }

  try {
    // Step 1: Notify user and start loading FFmpeg
    status.textContent = 'Loading FFmpeg...';
    console.log('Initializing FFmpeg...');
    
    const loadStartTime = Date.now();
    await ffmpeg.load();
    console.log(`FFmpeg loaded successfully in ${Date.now() - loadStartTime}ms`);

    // Step 2: Notify user about processing
    status.textContent = 'Processing video...';
    console.log('Writing input file to virtual filesystem...');
    ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(videoInput));
    console.log('Input file written successfully.');

    // Step 3: Execute FFmpeg resizing command
    console.log('Running FFmpeg command to resize video...');
    await ffmpeg.run('-i', 'input.mp4', '-vf', 'scale=640:360', 'output.mp4');
    console.log('FFmpeg command executed successfully.');

    // Step 4: Read the output file from FFmpeg's virtual filesystem
    console.log('Reading output file from virtual filesystem...');
    const data = ffmpeg.FS('readFile', 'output.mp4');
    console.log('Output file read successfully. Preparing for download...');

    // Step 5: Create a downloadable link for the processed video
    const blob = new Blob([data.buffer], { type: 'video/mp4' });
    const url = URL.createObjectURL(blob);

    downloadLink.href = url;
    downloadLink.download = 'resized_video.mp4';
    downloadLink.style.display = 'block';
    downloadLink.textContent = 'Download Resized Video';
    status.textContent = 'Done!';
    console.log('Video resizing completed successfully.');

  } catch (error) {
    console.error('Error during processing:', error);
    status.textContent = 'An error occurred during processing.';
  }
});
