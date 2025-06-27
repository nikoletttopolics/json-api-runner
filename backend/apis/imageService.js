const log = require("../logger");

let MOCK_IMAGES = [
  {
    id: 1,
    title: "dog",
    imageUrl:
      "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2022/01/02191920/Mudi-standing-on-a-rural-road-in-the-fall.jpg",
  },
  {
    id: 2,
    title: "cat",
    imageUrl:
      "https://cdn-ilbchkb.nitrocdn.com/WllOMUTxoJzqhbExyNPkiIfhtSpngzPM/assets/images/optimized/rev-5cc9c3c/sustainablecats.com/wp-content/uploads/2024/05/MAine-Coon-Giant.jpg",
  },
  {
    id: 3,
    title: "horse",
    imageUrl:
      "https://www.lovasok.hu/wp-content/uploads/2023/11/a-friz-lo-jellemzoi-es-fajtastandardja.png",
  },
  {
    id: 4,
    title: "parrot",
    imageUrl:
      "https://cdn.britannica.com/35/3635-050-96241EC1/Scarlet-macaw-ara-macao.jpg?w=300",
  },
];

const imageService = async (payload) => {
  const result = [];

  for (let i = 0; i < payload.length; i++) {
    if (payload[i].endpoint === "getImage") {
      result.push(getImage(payload[i].params.id));
    } else if (payload[i].endpoint === "deleteImage") {
      result.push(deleteImage(payload[i].params.id));
    } else if (payload[i].endpoint === "getImages") {
      result.push({ getImagesResponse: MOCK_IMAGES });
    } else {
      result.push({ error: "Unknown endpoint: " + payload[i].endpoint });
      log(`Unknown endpoint: ${payload[i].endpoint}`, "imageService", "error");
    }
  }
  return result;
};

const getImage = (id) => {
  const selectedImage = MOCK_IMAGES.find((image) => image.id === id);

  if (selectedImage) {
    return { getImageResponse: selectedImage };
  } else {
    return { getImageError: `No image found with id: ${id}` };
  }
};

const deleteImage = (id) => {
  const doesImageExist = MOCK_IMAGES.some((image) => image.id === id);

  if (doesImageExist) {
    MOCK_IMAGES = MOCK_IMAGES.filter((image) => image.id !== id);
    return {
      deleteImageResponse: `Image with id: ${id} deleted`,
    };
  } else {
    return {
      deleteImageError: `No image found with id: ${id}`,
    };
  }
};

module.exports = imageService;
