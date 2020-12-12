const postModel = require('../../models/post')
const userModel = require('../../models//user')
const dateService = require('../../services/dateService')
const userService = require('../../services/userService')
const commentModel = require('../../models/comments')
const _ = require('lodash')


exports.showPost = async (req, res) => {

    const postSlug = req.params.post_slug;
    const post = await postModel.findBySlug(postSlug)    
    post.jalaliPersian = dateService.toPersianDate(post.created_at)
        
    

    if(!post){
        res.frontRender('/404')
    }
    
    const user = await userModel.findById(post.author_id)
    user.avatar = userService.gravatar(user.email)
    post.author = user;
    const comments = await commentModel.findByPostId(post.id)
    const presentComment = comments.map(comment => {
        comment.avatar = userService.gravatar(comment.user_email)
        comment.persianDate = dateService.toPersianDate(comment.created_at)
        return comment
    })
    const newComment = _.groupBy(presentComment, 'parent')

    return res.frontRender('front/post/single', {post, comment: newComment[0],
        helpers: {
            getNestComment: (commentId) => {
                return commentId in newComment;
            }, 
            showNestComment: (commentId) => {
                return newComment[commentId]
            } 
        }
    })

} 