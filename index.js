const uwu = document.getElementById("uwu");
const waifuImage = document.querySelector('#waifuImage');

const apiUrl = 'https://api.waifu.im/search';

uwu.addEventListener('click', function () {
  // Get selected tags
  const checkboxes = document.querySelectorAll('#tag-options input[type="checkbox"]:checked');
  const tags = Array.from(checkboxes)
    .filter(cb => cb.id !== "gif-toggle") // skip gif toggle for now
    .map(cb => cb.value);

  // Check if GIF toggle is enabled
  const isGif = document.getElementById("gif-toggle").checked;

  // Build params
  const params = new URLSearchParams();
  if (tags.length > 0) {
    tags.forEach(tag => params.append("included_tags", tag));
  }
  if (isGif) {
    params.set("is_gif", "true");
  }

  const requestUrl = `${apiUrl}?${params.toString()}`;

  fetch(requestUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Request failed with status code: ' + response.status);
      }
      return response.json();
    })
    .then(data => {
      if (data.images && data.images.length > 0) {
        const url = data.images[0].url;
        waifuImage.innerHTML = `
          <img id="waifus" src="${url}" alt="waifu" style="max-height: 500px;">
        `;
      } else {
        waifuImage.innerHTML = `<p>No images found 😢</p>`;
      }
    })
    .catch(error => {
      console.error('An error occurred:', error.message);
      waifuImage.innerHTML = `<p>Error: ${error.message}</p>`;
    });
});
