import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";

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

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find User by this ID " });
  }

  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save(session);
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ blog });
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
    blog = await Blog.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (error) {
    return console.log(error);
  }
  if (!blog) {
    return res.status(400).json({ message: "Unable to delete Blog" });
  }
  return res.status(200).json({ message: "Deleted successfully" });
};

export const getByUserId = async (req, res, nex) => {
  const userId = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(userId).populate("blogs");
  } catch (error) {
    return console.log(error);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "No blog Found" });
  }
  return res.status(200).json({ blogs: userBlogs });
};
