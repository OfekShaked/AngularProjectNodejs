const fs = require('fs');
const readline = require('readline');
const fsp = fs.promises;
class CategoryService{
    async addCategory(props){
        if(!await this.isCategoryExist(props.category_name)){
            fsp.appendFile('./assets/categories/categories.txt', `${props.category_name}\n`, function (err) {
                if (err) console.log(err);
              });
        }
    }
    async isCategoryExist(category_name){
        const fileStream = await fs.createReadStream('./assets/categories/categories.txt');
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
          });

          for await (const line of rl) {
            // Each line in input.txt will be successively available here as `line`.
            if (category_name===line){
                return true;
            }
          }
          return false;
    }
    async getAllCategories(){
        let categories = [];
        const fileStream = await fs.createReadStream('./assets/categories/categories.txt');
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
          });

          for await (const line of rl) {
            categories.push(line);
          }
          return categories;
    }
}
module.exports=new CategoryService();