const PropertiesReader = require("properties-reader");
const path = require("path");

exports.getProperty = function(file, key) {
  console.log(__dirname);
  const prop = PropertiesReader(
    path.join(__dirname, "../") + "properties/" + file
  );
  return prop.get(key);
};

exports.setProperty = function(file, key, value) {
  const prop = PropertiesReader(
    path.join(__dirname, "../") + "properties/" + file
  );
  prop.set(key, value);
  prop.save(path.join(__dirname, "../") + "properties/" + file);
};
