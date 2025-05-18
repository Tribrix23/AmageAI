
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("warningOverlay");
  const btn = document.getElementById("understoodBtn");

  btn.addEventListener("click", () => {
    overlay.style.display = "none";
  });
});


document.addEventListener('DOMContentLoaded', () => {

  const generateButton = document.getElementById("GbTn");

  const dropdownButton = document.getElementById('dropdownButton');
  const dropdownOptions = document.getElementById('dropdownOptions');

  dropdownButton.addEventListener('click', () => {
    dropdownOptions.style.display = dropdownOptions.style.display === 'block' ? 'none' : 'block';
  });

  document.querySelectorAll('.dropdown-option').forEach(option => {
    option.addEventListener('click', () => {
      dropdownButton.textContent = option.getAttribute('data-value');
      dropdownOptions.style.display = 'none';
    });
  });


  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown-container')) {
      dropdownOptions.style.display = 'none';
    }
  });

  document.addEventListener('keydown', function(event) {
    if(event.key === "Enter") {
      generateImage();
    }
  });

generateButton.addEventListener('click', () => {
  generateImage();
})

async function generateImage() {
  const prompt = document.getElementById('hf').value;
  const aspectRatio = dropdownButton.textContent;
  const outputContainer = document.getElementById('out');
  
  generateButton.style.display = "none";

  const apiUrl = `https://1yjs1yldj7.execute-api.us-east-1.amazonaws.com/default/ai_image?prompt=${encodeURIComponent(prompt)}&aspect_ratio=${aspectRatio}&link=${encodeURIComponent('writecream.com')}`;

  outputContainer.innerHTML = '<div class=""> <img src="./Screenshot_2025-05-18_at_12-15-19_AI_-_Image_Generator-removebg-preview.png" alt="" class="spinner"> </div>';

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
    generateButton.style.display = "block"
  } catch (error) {
    alert('Error generating image: ' + error.message);
  }
}
})


