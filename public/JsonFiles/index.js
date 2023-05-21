const fs = require("fs");
const Store  = require('../../src/components/Store');

// Dosyadaki mevcut verileri okuyun
const jsonData = fs.readFileSync("Buyukfont1.json", "utf-8");
const existingData = JSON.parse(jsonData);

// Yeni veriyi oluşturun
const description = Store.description;
const newData = {
  partName: "ECI PAR DENEME",
  description,
  defectName: "ARACI VPI ANALİZ 'E AYIRIN"
};

// Mevcut verilere yeni veriyi ekleyin
existingData.data.push(newData);

// Güncellenmiş veriyi JSON dosyasına yazma işlemi
fs.writeFile("Buyukfont1.json", JSON.stringify(existingData), err => {
  if (err) throw err;
  console.log("Data written to JSON file");
});