const fs = require('fs').promises;
class LibraryService{
   async addLibaryDetails(props){
       try{
    await fs.writeFile("./assets/library_info.txt",JSON.stringify(props))
                .catch((err)=>{
                    console.log(err);
                });
            }catch(err){
                console.log(err);
            }
   } 
}
module.exports = new LibraryService();