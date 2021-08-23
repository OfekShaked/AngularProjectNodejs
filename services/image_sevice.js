const fs = require("fs").promises;
const ImageModel = require("../models/image_model");
const ResponseImageModel = require("../models/response_image_model");
const errorHandler = require("./error_handler");

let dataPath = "./assets/data.txt";
class ImageService {
  async addNewImage(props) {
    try {
      let newImage = new ImageModel({ imageId: await this.getNewImageId() });
      await this.saveNewImageToAssets(
        props.base64String,
        newImage.imagePath,
        JSON.stringify(newImage),
        newImage.imageDataPath
      );
    } catch (err) {
      errorHandler(err);
    }
  }

  async getAllImages() {
    try {
      const response_images = [];
      let files = await fs.readdir("./assets/images-data");
      for (let index = 0; index < files.length; index++) {
        let data = await fs
          .readFile(`./assets/images-data/${files[index]}`)
          .then(function (result) {
            let data = result + "";
            return data;
          })
          .catch(function (error) {
            console.log(error);
          });
        let response_image = new ResponseImageModel(JSON.parse(data));
        response_image.base64String = await fs
          .readFile(`./assets/images/${response_image.imageId}.png`, {
            encoding: "base64",
          })
          .then(function (result) {
            let data = result + "";
            return data;
          })
          .catch(function (error) {
            errorHandler(error);
          });
        response_images.push(response_image);
      }
      return response_images;
    } catch (err) {
      errorHandler(err);
      return "";
    }
  }

  async editImageData(props) {
    try {
      let imageData = await this.getImageDataById(props.imageId);
      imageData = JSON.parse(imageData);
      let updatedImage = new ImageModel(props);
      updatedImage.imageDataPath = imageData.imageDataPath;
      updatedImage.imagePath = imageData.imagePath;
      updatedImage.title = props.title ? props.title : imageData.title;
      updatedImage.categories = props.categories
        ? props.categories
        : imageData.categories;
      updatedImage.location = props.location
        ? props.location
        : imageData.location;
      updatedImage.isFavourite =
        props.isFavourite !== undefined
          ? props.isFavourite
          : imageData.isFavourite;
      updatedImage.isPrivate =
        props.isPrivate !== undefined ? props.isPrivate : imageData.isPrivate;
      updatedImage.imageId = imageData.imageId;
      await fs
        .writeFile(
          `./assets/images-data/${props.imageId}.txt`,
          JSON.stringify(updatedImage)
        )
        .catch((err) => {
          errorHandler(err);
        });
    } catch (err) {
      errorHandler(err);
    }
  }

  async getImageDataById(id) {
    try {
      let data = await fs
        .readFile(`./assets/images-data/${id}.txt`)
        .then(function (result) {
          let data = result + "";
          return data;
        })
        .catch(function (error) {
          errorHandler(error);
          return "";
        });
      return data;
    } catch (err) {
      errorHandler(err);
      return "";
    }
  }

  async getNewImageId() {
    try {
      let data = await fs
        .readFile(dataPath)
        .then(function (result) {
          let data = result + "";
          return data;
        })
        .catch(function (error) {
          console.log(error);
        });
      let newId = parseInt(data) + 1;
      await fs.writeFile(dataPath, newId.toString()).catch((err) => {
        console.log(err);
      });
      return data;
    } catch (err) {
      errorHandler(err);
      return "";
    }
  }

  async saveNewImageToAssets(
    base64String,
    imagePath,
    imageData,
    imageDataPath
  ) {
    try {
      let base64Image = base64String.split(";base64").pop();
      await fs
        .writeFile(imagePath, base64Image, { encoding: "base64" })
        .catch((err) => {
          console.log(err);
        });
      await fs.writeFile(imageDataPath, imageData).catch((err) => {
        console.log(err);
      });
    } catch (err) {
      errorHandler(err);
    }
  }
}
module.exports = new ImageService();
