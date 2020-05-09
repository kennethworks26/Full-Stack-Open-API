const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://kennethworks26:${password}@cluster0-7kpwc.mongodb.net/notes?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
  name: "Kenneth Fernandez",
  number: "09771022680"
});

person.save().then(response => {
  console.log(`added ${response.name} number ${response.number} to phonebook!`);
  mongoose.connection.close();
});
