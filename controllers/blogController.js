import Blog from "../model/Blog.js";

export const getAllBlogs = async (req, res, nex) => {
  let blogs;
  try {
    blogs = await Blog.find();
  } catch (error) {
    console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No blogs Found" });
  }
  return res.status(200).json({ blogs });
};

export const addBlog = async (req, res, nex) => {
  const { title, description, image, user } = req.body;

  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    await blog.save();
  } catch (error) {
    return console.log(error);
  }
  return res.status(200).json({ blog });
};

export const updateBlog = async (req, res, nex) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to update The Blog" });
  }
  return res.status(200).json({ blog });
};

export const getById = async (req, res, nex) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(404).json({ message: "No Blog found" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async (req, res, nex) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id);
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(400).json({ message: "Unable to delete Blog" });
  }
  return res.status(200).json({ message: "Deleted successfully" });
};
