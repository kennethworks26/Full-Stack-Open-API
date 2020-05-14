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

const favoriteBlog = (blogs) => {
  const max = blogs.reduce(function (prev, current) {
    return prev.likes > current.likes ? prev : current;
  });

  return max;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
