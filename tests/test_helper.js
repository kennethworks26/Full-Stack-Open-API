const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "HTML is easy",
    author: "Kenneth Fernandez",
    url: "https:www.kennethworks.com",
    likes: 10
  },
  {
    title: "CSS is insane",
    author: "John Doe",
    url: "https:www.kennethworks.com",
    likes: 3
  },
  {
    title: "Javascript is awesome",
    author: "David Smith",
    url: "https:www.kennethworks.com",
    likes: 4
  }
];

const nonExistingId = async () => {
  const blog = new Blog({ title: "willremovethissoon" });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map(blog => blog);
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb
};
