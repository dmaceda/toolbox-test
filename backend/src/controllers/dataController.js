const dataHelper = require("../utils/helpers");

const getFormattedFiles = async (req, res) => {
  try {
    const data = await dataHelper.unifiedObjects();
    const name = req.query && req.query.fileName;
    let response = data;
    if (name) {
      const filtered = data.filter((item) =>
        item.file.toLowerCase().includes(name.toLowerCase())
      );
      if (filtered.length > 0) {
        response = filtered;
      } else {
        return res.status(404).send("File not found");
      }
    }
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const getOriginalFiles = async (req, res) => {
  try {
    const files = await dataHelper.fetchData();
    const data = await dataHelper.fetchOriginalData(req, res, files);
    promises = await Promise.all(data);
    finalData = promises.map((item) => item);
    res.status(200).json(finalData);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getFormattedFiles,
  getOriginalFiles,
};
