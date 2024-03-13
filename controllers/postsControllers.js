import Post from "../models/postsModel.js";
import User from "../models/usersModel.js";

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ updatedAt: "descending" }).limit(10);
    res.json(posts);
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ message: error.message });
  }
};

const getAllPostsWithAuthorInformations = async (req, res) => {
  try {
    const posts = await Post.find().populate("author");
    if (!posts.length) {
      return res.status(404).json({ message: "Posts not found!" });
    }
    res.json({ message: "Posts found", posts });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ message: error.message });
  }
};

const addPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const userExists = await User.findById(author);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    const newPost = { title, content, author };
    await Post.create(newPost);
    res.json({ message: "new post addedd", newPost });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteAllPosts = async (req, res) => {
  try {
    await Post.deleteMany();
    res.status(200).json({ msg: "All users deleted" });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ message: error.message });
  }
};

const getOnePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      throw new Error("Post nox exists");
    }
    res.json({ message: "Post found", post });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found!" });
    }
    res.json({ message: "Post deleted", deletedPost });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const newPost = req.body;
    const updatedPost = await Post.findByIdAndUpdate(id, newPost, {
      new: true,
    });
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found!" });
    }
    res.json({ message: "Post updated", updatedPost });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ message: error.message });
  }
};

const updatePartialPost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
      }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found!" });
    }
    res.json({ message: "Post updated", updatedPost });
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ message: error.message });
  }
};

export {
  getAllPosts,
  addPost,
  deleteAllPosts,
  getOnePost,
  deletePost,
  updatePost,
  updatePartialPost,
  getAllPostsWithAuthorInformations,
};
