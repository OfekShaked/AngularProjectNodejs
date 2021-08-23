const fs = require("fs").promises;
const errorHandler = require("./error_handler");

class LibraryService {
  async addLibaryDetails(props) {
    try {
      let library_info = await this.getLibraryData();
      library_info = { ...library_info, ...props };
      await fs
        .writeFile("./assets/library_info.txt", JSON.stringify(library_info))
        .catch((err) => {
          errorHandler(err);
        });
    } catch (err) {
      errorHandler(err);
    }
  }
  async getLibraryData() {
    try {
      let data = await fs
        .readFile(`./assets/library_info.txt`)
        .then(function (result) {
          let data = result + "";
          return data;
        })
        .catch(function (error) {
          errorHandler(error);
          return "";
        });
      return JSON.parse(data);
    } catch (err) {
      errorHandler(err);
      return "";
    }
  }

  async setLibraryPassword(password) {
    try {
      let library_info = await this.getLibraryData();
      library_info.password = password;
      await fs
        .writeFile("./assets/library_info.txt", JSON.stringify(library_info))
        .catch((err) => {
          errorHandler(err);
        });
    } catch (err) {
      errorHandler(err);
    }
  }
  async checkIfLibraryHasPrivateMode() {
    try {
      let library_info = await this.getLibraryData();
      if (library_info.password !== "") return true;
      return false;
    } catch (err) {
      errorHandler(err);
    }
  }
  async checkIfPasswordIsCorrect(password) {
    try {
      let library_info = await this.getLibraryData();
      if (library_info.password === password) return true;
      return false;
    } catch (err) {
      errorHandler(err);
    }
  }
}
module.exports = new LibraryService();
