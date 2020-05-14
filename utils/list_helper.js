const dummy = (blogs) => {
  blogs = [];

  return 1;
};

const totalLikes = (blogs) => {
  let initialValue = 0;

  let sum = blogs.reduce(
    (accumulator, currentvalue) => accumulator + currentvalue.likes,
    initialValue
  );

  return sum;
};

module.exports = {
  dummy,
  totalLikes,
};
