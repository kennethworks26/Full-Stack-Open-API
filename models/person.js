const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Person", personSchema);
