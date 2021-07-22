class ResponseImageModel{
    constructor(props){
        this.imageId = props.imageId||null;
        this.title=props.title||null;
        this.categories = props.categories||null;
        this.isFavourite= props.isFavourite||null;
        this.isPrivate = props.isPrivate||null;
        this.location= props.location||null;
        this.base64String=props.base64String||null;
    }
}
module.exports = ResponseImageModel;