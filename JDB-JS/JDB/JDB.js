class JDB {
  constructor(cdn_url) {
    this.fs = require("fs");
    this.path = require("path");
    //this.cdn_url = `./JDB/JDBF/${cdn_url}.json`;
    this.cdn_url = path.join(__dirname, "./JDBF/" + cdn_url + ".json");
  }

  readData() {
    const jsonData = this.fs.readFileSync(this.cdn_url, "utf-8");

    return JSON.parse(jsonData);
  }

  writeData(data) {
    this.fs.writeFileSync(
      this.cdn_url,
      JSON.stringify("{" + data + "}")
        .replace(/^"|"$/g, "")
        .replace(/\\/g, ""),
    );
  }
  getData(key) {
    const jsonData = this.fs.readFileSync(this.cdn_url, "utf-8");
    const parsedData = JSON.parse(jsonData);
    return parsedData[key];
  }

  setData(name, value) {
    var jsonData = this.fs.readFileSync(this.cdn_url, "utf-8");
    var parsedData = JSON.parse(jsonData);
    parsedData[name] = value;
    this.fs.writeFileSync(this.cdn_url, JSON.stringify(parsedData));
  }

  removeData(name) {
    const jsonData = this.fs.readFileSync(this.cdn_url, "utf-8");
    const parsedData = JSON.parse(jsonData);
    delete parsedData[name];
    this.fs.writeFileSync(this.cdn_url, JSON.stringify(parsedData));
  }

  addData(key, value) {
    var jsonData = this.fs.readFileSync(this.cdn_url, "utf-8");
    var parsedData = JSON.parse(jsonData);
    parsedData[key] = value;
    this.fs.writeFileSync(this.cdn_url, JSON.stringify(parsedData));
  }

  addBigData(dataString) {
    var jsonData = this.fs.existsSync(this.cdn_url)
      ? this.fs.readFileSync(this.cdn_url, "utf-8")
      : "{}";
    var parsedData = JSON.parse(jsonData);
    const newData = JSON.parse(`{${dataString}}`);
    Object.assign(parsedData, newData);
    this.fs.writeFileSync(this.cdn_url, JSON.stringify(parsedData, null, 2));
  }

  removeAllData(brackets) {
    if (brackets == true) {
      this.fs.writeFileSync(this.cdn_url, "{}");
    } else {
      this.fs.writeFileSync(this.cdn_url, "");
    }
  }

  hasData(value) {
    const jsonData = this.fs.readFileSync(this.cdn_url, "utf-8");
    const parsedData = JSON.parse(jsonData);
    for (const key in parsedData) {
      if (parsedData[key] == value) {
        return key;
      }
    }
    return null;
  }

  setKey(name, newname) {
    var jsonData = this.fs.readFileSync(this.cdn_url, "utf-8");
    var parsedData = JSON.parse(jsonData);
    parsedData[newname] = parsedData[name];
    delete parsedData[name];
    this.fs.writeFileSync(this.cdn_url, JSON.stringify(parsedData));
  }
}

const fss = require("fs");
const path = require("path");

function CreateJDBF(name) {
  fss.writeFileSync(path.join(__dirname, "./JDBF/" + name + ".json"), "{}");
}

function DestroyJDBF(name) {
  fss.unlinkSync(path.join(__dirname, "./JDBF/" + name + ".json"));
}

function IntegrateJDBF(oldf, newf) {
  var data = fss.readFileSync(
    path.join(__dirname, "./JDBF/" + oldf + ".json"),
    "utf-8",
  );
  var parsed = JSON.parse(data);
  fss.writeFileSync(
    path.join(__dirname, "./JDBF/" + newf + ".json"),
    JSON.stringify(parsed),
  );
}

function DuplicateJDBF(file, name) {
  var d = fss.readFileSync(
    path.join(__dirname, "./JDBF/" + file + ".json"),
    "utf-8",
  );
  var par = JSON.parse(d);
  fss.writeFileSync(
    path.join(__dirname, "./JDBF/" + name + ".json"),
    JSON.stringify(par),
  );
}

function HookJDBF(fileone, filetwo) {
  function watchFiles() {
    const contentOne = fss.readFileSync(
      path.join(__dirname, "./JDBF", fileone + ".json"),
      "utf8",
    );

    const contentTwo = fss.readFileSync(
      path.join(__dirname, "./JDBF", filetwo + ".json"),
      "utf8",
    );

    if (contentOne !== contentTwo) {
      fss.writeFileSync(
        path.join(__dirname, "./JDBF", filetwo + ".json"),
        contentOne,
      );
    }
  }
  setInterval(watchFiles, 1000);
}
module.exports = {
  JDB,
  CreateJDBF,
  DestroyJDBF,
  IntegrateJDBF,
  DuplicateJDBF,
  HookJDBF,
};
