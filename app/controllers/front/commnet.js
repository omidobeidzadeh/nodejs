const postModel = require('../../models/post')
const commentModel = require('../../models/comments')
const settingModel = require('../../models/setting')
const commentValidator = require('../../validators/comment')

exports.store = async (req, res) => {
    const post = await postModel.findBySlug(req.params.post_slug)
    if(!post){
        res.redirect('/404')
    }
    const {user_name, user_url, user_email, user_comment} = req.body;
    const commentData = {
        author_id: 'user' in req.session ? req.session.user.id : null,
        post_id: post.id,
        user_name,
        user_url,
        user_email,
        comment: user_comment
    }
    const comment = parseInt(await settingModel.get('users_can_submit_comment'))
    const errors = commentValidator.create(commentData)
    
    if(errors.length > 0) {
        req.flash('errors', errors)
        res.redirect(`/p/${post.slug}`) 
    }
    if(comment == 0){
        req.flash('errors', 'مجوز صدور  كامنت فراهم نيست')
        res.redirect(`/p/${post.slug}`) 
    }
    
    if(comment == 1){
        const result = await commentModel.create(commentData)
        if(result){
            res.redirect(`/p/${post.slug}`) 
    }
    } 
}