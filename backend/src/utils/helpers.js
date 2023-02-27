const axios = require("axios");
require("dotenv").config();

const { API_KEY } = process.env;

const fetchData = async (req, res) => {
  try {
    const response = await axios.get(
      "https://echo-serv.tbxnet.com/v1/secret/files",
      {
        headers: {
          accept: "application/json",
          authorization: API_KEY,
        },
      }
    );

    const files = response.data.files;
    return files;
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

const fetchOne = async (req, res, files) => {
  const promises = files.map((file) =>
    axios
      .get(`https://echo-serv.tbxnet.com/v1/secret/file/${file}`, {
        headers: {
          accept: "application/json",
          authorization: API_KEY,
        },
      })
      .then((response) => {
        const allLines =
          response.data.split("\n").length > 1 ? response.data.split("\n") : "";
        const dataLines = allLines.slice(1);

        return dataLines;
      })

      .catch((error) => {
        res?.status(500).send("Internal Server Error");
      })
  );
  return promises;
};

const fetchOriginalData = async (req, res, files) => {
  const results = [];

  for (const file of files) {
    try {
      const response = await axios.get(
        `https://echo-serv.tbxnet.com/v1/secret/file/${file}`,
        {
          headers: {
            accept: "application/json",
            authorization: API_KEY,
          },
        }
      );

      const allLines = response.data.split("\n");
      results.push(allLines);
    } catch (error) {
      console.log(`Error fetching original data for file ${file}: ${error}`);
      results.push([]);
    }
  }

  return results;
};

const formattedData = async (req, res) => {
  try {
    const files = await fetchData();
    const data = await fetchOne(req, res, files);
    const promises = await Promise.all(data);
    const finalData = promises.filter(
      (item) => item !== undefined && item !== ""
    );
    return finalData;
  } catch (error) {
    console.log("Error in formattedData", error);
    throw new Error("Internal Server Error");
  }
};

const createObjects = async () => {
  const isNumeric = (n) => !!Number(n);
  const data = await formattedData();
  const filteredData = data.map((item) => {
    const objects = item.map((line) => ({
      file: line.split(",")[0],
      text: line.split(",")[1],
      number: line.split(",")[2],
      hex: line.split(",")[3],
    }));

    const filtered = objects.filter(
      (item) => item.file && item.text && item.number && item.hex
    );
    return filtered;
  });

  return filteredData.flat();
};

const unifiedObjects = async (req, res) => {
  try {
    const data = await createObjects();

    const groupedData = data.reduce((acc, cur) => {
      if (!acc[cur.file]) {
        acc[cur.file] = [];
      }
      acc[cur.file].push({
        text: cur.text,
        number: cur.number,
        hex: cur.hex,
      });
      return acc;
    }, {});

    const result = Object.keys(groupedData).map((key) => ({
      file: key,
      lines: groupedData[key],
    }));

    return result;
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  fetchData,
  fetchOne,
  fetchOriginalData,
  formattedData,
  createObjects,
  unifiedObjects,
};
