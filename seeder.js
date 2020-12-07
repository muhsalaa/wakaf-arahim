const mongoose = require("mongoose");

const Block = require("./models/block");
const Muwaqif = require("./models/muwaqif");
const MiniBlock = require("./models/miniBlock");

// connect to db
mongoose.connect("mongodb://waqaf:waqaf123@127.0.0.1:27017/waqaf", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const data = [...Array(149).fill({ status: "available", share: false })];

// import to db
const importData = async () => {
  try {
    await Block.create(data);

    console.log("Data imported...");
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

// delete data
const deleteData = async () => {
  try {
    await Block.deleteMany();
    await Muwaqif.deleteMany();
    await MiniBlock.deleteMany();

    console.log("Data deleted...");
    process.exit();
  } catch (error) {
    console.error(error);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
