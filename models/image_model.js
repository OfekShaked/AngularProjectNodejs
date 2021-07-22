class ImageModel{
    constructor(props){
        this.imageId = props.imageId||null;
        this.title=props.title||null;
        this.categories = props.categories||null;
        this.isFavourite= props.isFavourite||null;
        this.isPrivate = props.isPrivate||null;
        this.location= props.location||null;
        this.imagePath= `./assets/images/${this.imageId}.png`;
        this.imageDataPath = `./assets/images-data/${this.imageId}.txt`;
    }
}
module.exports = ImageModel;