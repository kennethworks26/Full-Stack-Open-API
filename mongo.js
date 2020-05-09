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

if (process.argv[3] && process.argv[4]) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  });

  person.save().then(response => {
    console.log(
      `added ${response.name} number ${response.number} to phonebook!`
    );
    mongoose.connection.close();
  });
} else {
  console.log("phonebook");
  Person.find({}).then(persons => {
    persons.map(person => console.log(`${person.name} ${person.number}`));
    mongoose.connection.close();
  });
}
