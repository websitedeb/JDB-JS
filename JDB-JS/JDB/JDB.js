class JDB {
  constructor(cdn_url) {
    this.fs = require("fs");
    this.path = require("path");
    this.cdn_url = path.join(__dirname, "./JDBF/" + cdn_url + ".json");
  }

  replaceURL(new_url) {
    this.cdn_url = path.join(__dirname, "./JDBF/" + new_url + ".json");
  }

  terminate() {
    try {
      throw new Error("JDB has ended [ THIS IS NOT AN ERROR ]");
    } catch (err) {
      console.log(err.message);
    }
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

  setKey(name, new_name) {
    var jsonData = this.fs.readFileSync(this.cdn_url, "utf-8");
    var parsedData = JSON.parse(jsonData);
    parsedData[new_name] = parsedData[name];
    delete parsedData[name];
    this.fs.writeFileSync(this.cdn_url, JSON.stringify(parsedData));
  }

  hasData(value, returnBool) {
    var jsonData = this.fs.readFileSync(this.cdn_url, "utf-8");
    var parsedData = JSON.parse(jsonData);
    var keys = Object.keys(parsedData);
    var values = Object.values(parsedData);
    var index = values.indexOf(value);
    if (returnBool == true) {
      if (keys[index]) {
        return true;
      } else {
        return false;
      }
    } else {
      return keys[index];
    }
  }

  onWriteData(data, callback) {
    var written = false;
    this.fs.writeFileSync(
      this.cdn_url,
      JSON.stringify("{" + data + "}")
        .replace(/^"|"$/g, "")
        .replace(/\\/g, ""),
    );
    written = true;
    if (written) {
      callback();
    }
  }

  onReadData(callback) {
    var w = false;
    var txt = this.fs.readFileSync(this.cdn_url, "utf-8");
    w = true;
    if (w) {
      callback(txt);
    }
    return txt;
  }

  onAddData(dataString, callback) {
    var added = false;
    var jsonData = this.fs.existsSync(this.cdn_url)
      ? this.fs.readFileSync(this.cdn_url, "utf-8")
      : "{}";
    var parsedData = JSON.parse(jsonData);
    const newData = JSON.parse(`{${dataString}}`);
    Object.assign(parsedData, newData);
    this.fs.writeFileSync(this.cdn_url, JSON.stringify(parsedData, null, 2));
    added = true;
    if (added) {
      callback();
    }
  }

  onRemoveData(name, callback) {
    var done = false;
    const jsonData = this.fs.readFileSync(this.cdn_url, "utf-8");
    const parsedData = JSON.parse(jsonData);
    delete parsedData[name];
    this.fs.writeFileSync(this.cdn_url, JSON.stringify(parsedData));
    done = true;
    if (done) {
      callback();
    }
  }

  limitData(by) {
    const jsonData = this.fs.readFileSync(this.cdn_url, "utf-8");
    const parsedData = JSON.parse(jsonData);
    const keys = Object.keys(parsedData);
    const values = Object.values(parsedData);
    const result = keys.slice(0, by).map((key, index) => {
      return {
        key: key,
        value: values[index],
      };
    });
    return result;
  }

  keyExists(key) {
    const jsonData = this.fs.readFileSync(this.cdn_url, "utf-8");
    const parsedData = JSON.parse(jsonData);
    return Object.keys(parsedData).includes(key);
  }

  valueExists(value) {
    const jsonData = this.fs.readFileSync(this.cdn_url, "utf-8");
    const parsedData = JSON.parse(jsonData);
    const values = Object.values(parsedData);
    return values.includes(value);
  }

  countData() {
    const jsonData = this.fs.readFileSync(this.cdn_url, "utf-8");
    const parsedData = JSON.parse(jsonData);
    return Object.keys(parsedData).length;
  }

  whereKey(key) {
    const jsonData = this.fs.readFileSync(this.cdn_url, "utf-8");
    const parsedData = JSON.parse(jsonData);
    const keys = Object.keys(parsedData);
    const index = keys.indexOf(key);
    return index;
  }

  whereValue(value) {
    const jsonData = this.fs.readFileSync(this.cdn_url, "utf-8");
    const parsedData = JSON.parse(jsonData);
    const values = Object.values(parsedData);
    const index = values.indexOf(value);
    return index;
  }

  sortData(by, type) {
    const jsonData = this.fs.readFileSync(this.cdn_url, "utf-8");
    const parsedData = JSON.parse(jsonData);
    switch (by) {
      case "key":
        switch (type) {
          case "asc":
            const keys = Object.keys(parsedData).sort();
            return keys;
          case "desc":
            const key = Object.keys(parsedData).sort().reverse();
            return key;
          case "num":
            const key2 = Object.keys(parsedData).sort((a, b) => {
              return parsedData[a] - parsedData[b];
            });
            return key2;
          case "letters":
            const key3 = Object.keys(parsedData).sort((a, b) => {
              return a.localeCompare(b);
            });
            return key3;
          case "words":
            const key4 = Object.keys(parsedData).sort((a, b) => {
              return a.split(" ").length - b.split(" ").length;
            });
            return key4;
          case "normal":
            const key5 = Object.keys(parsedData).sort();
            return key5;
        }
      case "value":
        switch (type) {
          case "asc":
            const values = Object.values(parsedData).sort();
            return values;
          case "desc":
            const value = Object.values(parsedData).sort().reverse();
            return value;
          case "num":
            const value2 = Object.values(parsedData).sort((a, b) => {
              return parsedData[a] - parsed[b];
            });
            return value2;
          case "letters":
            const key3 = Object.keys(parsedData).sort((a, b) => {
              return a.localeCompare(b);
            });
            return key3;
          case "words":
            const key4 = Object.keys(parsedData).sort((a, b) => {
              return a.split(" ").length - b.split(" ").length;
            });
            return key4;
          case "normal":
            const key5 = Object.keys(parsedData).sort();
            return key5;
        }
    }
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
    path.join(__dirname, "./JDBF/" + name + `.json`),
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
