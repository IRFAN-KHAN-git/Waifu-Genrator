
const uwu = document.getElementById("uwu")
const waifuImage = document.querySelector('#waifuImage');

const apiUrl = 'https://api.waifu.im/search';  
const params = {
  
  included_tags: 'maid'
 
//   "maid",
//   "waifu",
//   "marin-kitagawa",
//   "mori-calliope",
//   "raiden-shogun",
//   "oppai",
//   "selfies",
//   "uniform",
//   "kamisato-ayaka"
//   "ass",
//   "hentai",
//   "milf",
//   "oral",
//   "paizuri",
//   "ecchi",
//   "ero"

};

const queryParams = new URLSearchParams();

for (const key in params) {
  if (Array.isArray(params[key])) {
    params[key].forEach(value => {
      queryParams.append(key, value);
    });
  } else {
    queryParams.set(key, params[key]);
  }
}
const requestUrl = `${apiUrl}?${queryParams.toString()}`;

uwu.addEventListener('click',function(){


fetch(requestUrl)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Request failed with status code: ' + response.status);
    }
  })
  .then(data => {
    let responce=data.images[0].url
    waifuImage.innerHTML=`
        <img  id="waifus" src="${responce}" style="height: 500px;">
    `
    
  })
  .catch(error => {
    console.error('An error occurred:', error.message);
  });
})