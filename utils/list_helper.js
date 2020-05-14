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
  return blogs.reduce((max, blog) => (blog.likes > max ? blog.likes : max), 0);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
