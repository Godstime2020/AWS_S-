const form = document.querySelector("#Form");
const input = document.querySelector("#Input");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const file = input.files[0];

  // get secure url from our server
  const res = await fetch("/s3Url");
  const {url} = await res.json();
  console.log(url);

  // post the image direclty to the s3 bucket
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: file,
  });

  const imageUrl = url.split("?")[0];
  console.log(imageUrl);

  // post requst to my server to store any extra data

  const img = document.createElement("img");
  img.src = imageUrl;
  document.body.appendChild(img);
});
