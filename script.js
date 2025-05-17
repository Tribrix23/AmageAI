async function generateImage() {
  const prompt = document.getElementById('promptText').value;
  const aspectRatio = document.getElementById('aspectRatioDropdown').value;
  const outputContainer = document.querySelector('.outputBoxes');

  const apiUrl = `https://1yjs1yldj7.execute-api.us-east-1.amazonaws.com/default/ai_image?prompt=${encodeURIComponent(prompt)}&aspect_ratio=${aspectRatio}&link=${encodeURIComponent('writecream.com')}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const imageUrl = data.image_link;

    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;
    imgElement.alt = "Generated Image";
    imgElement.classList.add('generated-image');

    outputContainer.innerHTML = '';
    outputContainer.appendChild(imgElement);
  } catch (error) {
    alert('Error generating image: ' + error.message);
  }
}
