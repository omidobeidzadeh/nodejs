const postModel = require('../../models/post')
const dateService = require('../../services/dateService')
const userModel = require('../../models/user')
const postValidator = require('../../validators/post')
const {v4: uuidv4} = require('uuid')

exports.index = async (req, res) => {
  const posts = await postModel.findAll()
  const presentedPost = posts.map((post) => {
    post.jalaliPersian = dateService.toPersianDate(post.created_at)
    return post
  })
  res.adminRender('admin/posts/index', { posts: presentedPost })
}
exports.create = async (req, res) => {
  const users = await userModel.findAll(['id', 'full_name'])
  res.adminRender('admin/posts/create', { users })
}
exports.store = async (req, res) => { 
  const fileExt = req.files.thumbnail.name.split('.')[1];
  const fileName = `${uuidv4()}.${fileExt}`
  const postData = {
    title: req.body.title,
    author_id: req.body.author,
    slug: req.body.slug,
    content: req.body.content,
    status: req.body.status,
    thumbnail: fileName
  }
  const errors = postValidator.create(postData)
  if (errors.length > 0) {
    req.flash('errors', errors)
    res.redirect('/admin/posts/create')
  } else {
    const insertId = await postModel.create(postData)
    if (insertId) {
      if(req.files.thumbnail){
        const filePath = `${process.env.PWD}/public/upload/${fileName}`
        req.files.thumbnail.mv(filePath, err => {
          if(err){
            console.log(err)
          }
        })
      }
      req.flash('success', 'مطلب با موفقیت ارسال شد')
      res.redirect('/admin/posts')
    }
  }
}
exports.remove = async (req, res) => {
  const postID = req.params.postId
  if (parseInt(postID) === 0) {
    res.redirect('/admin/posts')
  }
  const result = await postModel.delete(postID)
  res.redirect('/admin/posts')
}
exports.edit = async (req, res) => {
  const postID = req.params.postId
  if (parseInt(postID) === 0) {
    res.redirect('/admin/posts')
  }
  const post = await postModel.find(postID)
  const users = await userModel.findAll(['id', 'full_name'])
  
  res.adminRender('admin/posts/edit', {
    layout: 'admin',
    users,
    post,
    helpers: {IsPostAouthor: function(userId, options){
      return post.author_id == userId ? options.fn(this) : options.inverse(this);
    },
    IsPostStatus: function(status, options){
      return post.status == status ? options.fn(this) : options.inverse(this);
    }
  }
  })
}
exports.update = async (req, res) => {
  const fileExt = req.files.thumbnail.name.split('.')[1];
  const fileName = `${uuidv4()}.${fileExt}`
  const postID = req.params.postId
  const postData = {
    title: req.body.title,
    author_id: req.body.author,
    slug: req.body.slug,
    content: req.body.content,
    status: req.body.status,
    thumbnail: fileName
  }
  if(req.files.thumbnail){
    const filePath = `${process.env.PWD}/public/upload/${fileName}`
    req.files.thumbnail.mv(filePath, err => console.log(err))
  }
  if (parseInt(postID) === 0) {
    res.redirect('/admin/posts')
  }
  const result = await postModel.update(postID, postData)
  return res.redirect('/admin/posts')
}
