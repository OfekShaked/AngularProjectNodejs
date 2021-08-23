const fs = require("fs");
const readline = require("readline");
const errorHandler = require("./error_handler");
const fsp = fs.promises;
class CategoryService {
  async addCategory(props) {
    try {
      if (!(await this.isCategoryExist(props.category_name))) {
        fsp.appendFile(
          "./assets/categories/categories.txt",
          `${props.category_name},`,
          function (err) {
            if (err) errorHandler(err);
          }
        );
      }
    } catch (err) {
      errorHandler(err);
    }
  }
  async isCategoryExist(category_name) {
    try {
      const fileStream = await fs.createReadStream(
        "./assets/categories/categories.txt"
      );
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });
      for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        let categoriesSeperate = line.split(",");
        categoriesSeperate.forEach((element) => {
          if (category_name === element) {
            return true;
          }
        });
      }
      return false;
    } catch (err) {
      errorHandler(err);
      return false;
    }
  }
  async getAllCategories() {
    try{
    let categories = [];
    const fileStream = await fs.createReadStream(
      "./assets/categories/categories.txt"
    );
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      let categoriesSeperate = line.split(",");
      categoriesSeperate.forEach((str) => {
        if (str || str.length !== 0) categories.push(str);
      });
    }
    return categories;
  }catch(err){
    errorHandler(err);
    return [];
  }
  }
}
module.exports = new CategoryService();
