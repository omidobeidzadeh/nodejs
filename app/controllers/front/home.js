const postModel = require('../../models/post')
const dateService = require('../../services/dateService')
const exService = require('../../services/excerpt')
const settingModel = require('../../models/setting')

exports.index = async (req, res) => {
    const page = 'page' in req.query ? parseInt(req.query.page) : 1;
    const perpage = parseInt(await settingModel.get('posts_per_page'))
    const posts = await postModel.findAll(page, perpage)
    const totalPosts = await postModel.count() 
    const totalPages = Math.ceil(totalPosts/perpage)
    const pageInation = {
        page,
        totalPages,
        nextPage: page < totalPages ? page + 1 : totalPages,
        prevPage: page > 1 ? page - 1 : 1, 
        nextDis: page < totalPages,
        prevDis: page > 1,
    }
    const presentedPost = posts.map((post) => {
        post.jalaliPersian = dateService.toPersianDate(post.created_at)
        post.excerpt = exService.excerpt(post.content)
        return post
    })
    const latestPost = await postModel.latestPost(3)
    res.frontRender('front/home/index', {posts: presentedPost, latestPost: presentedPost, pageInation, helpers: {
        showDisable: function(isDisable, options){
            return !isDisable ? 'disabled' : '';
        }
    }})

}

exports.search = async (req, res) => {
    const posts = await postModel.findByKeyWord(req.query.keyword)
    const presentedPost = posts.map((post) => {
        post.jalaliPersian = dateService.toPersianDate(post.created_at)
        post.excerpt = exService.excerpt(post.content)
        return post
    })
    res.frontRender('front/home/search', {posts: presentedPost})
}