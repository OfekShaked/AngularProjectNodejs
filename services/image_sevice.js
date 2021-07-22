const fs = require('fs').promises;
const ImageModel = require('../models/image_model');
const ResponseImageModel = require('../models/response_image_model');

let dataPath = "./assets/data.txt";
class ImageService{

    async addNewImage(props){
        let newImage = new ImageModel({imageId:await this.getNewImageId()});
        await this.saveNewImageToAssets(props.base64String,newImage.imagePath,JSON.stringify(newImage),newImage.imageDataPath);
    }

    async getAllImages(){
        const response_images = [];
        let files = await fs.readdir('./assets/images-data');
        for (let index = 0; index < files.length; index++) {
            let data = await fs.readFile(`./assets/images-data/${files[index]}`)
                    .then(function(result) {
                        let data = result+"";
                        return data;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            let response_image = new ResponseImageModel(JSON.parse(data));
            response_image.base64String = await fs.readFile(`./assets/images/${response_image.imageId}.png`,{encoding:'base64'})
                                                  .then(function(result) {
                                                        let data = result+"";
                                                        return data;
                                                    })
                                                  .catch(function(error) {
                                                        console.log(error);
                                                    });
            response_images.push(response_image);
        };
        return response_images;
    }

    async editImageData(props){
       let imageData = await this.getImageDataById(props.imageID);
       let updatedImage = new ImageModel(props);
       updatedImage.imageDataPath = imageData.imageDataPath;
       updatedImage.imagePath = imageData.imagePath;
       await fs.writeFile(updatedImage.imageDataPath,JSON.stringify(updatedImage)).catch((err)=>{
           console.log(err);
       })
    }

    async getImageDataById(id){
        let data = await fs.readFile(`./assets/images-data/${id}.txt`)
                    .then(function(result) {
                        let data = result+"";
                        return data;
                    })
                    .catch(function(error) {
                        console.log(error);
                        return ""
                    });
        return data;
    }

   async getNewImageId(){
        let data = await fs.readFile(dataPath)
                    .then(function(result) {
                        let data = result+"";
                        return data;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
        let newId= parseInt(data)+1;
        await fs.writeFile(dataPath,newId.toString())
                .catch((err)=>{console.log(err);});
        return data;
    }

    async saveNewImageToAssets(base64String,imagePath,imageData,imageDataPath){
        let base64Image = base64String.split(';base64').pop();
        await fs.writeFile(imagePath, base64Image,{encoding:'base64'})
                .catch((err)=>{
                    console.log(err)
                });
        await fs.writeFile(imageDataPath,imageData)
                .catch((err)=>{
                    console.log(err);
                });
    }
}
module.exports = new ImageService();