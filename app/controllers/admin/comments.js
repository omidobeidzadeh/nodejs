const commentsModel = require('../../models/comments');
const userService = require('../../services/userService');
const dateService = require("../../services/dateService");
const commentStatus = require('../../models/commentstatus'); 
exports.index = async (req, res) => {
    const comments = await commentsModel.findAll();
    const presentComment = comments.map((comment) => {
        comment.userAvatar = userService.gravatar(comment.user_email);
        comment.jalaliPersian = dateService.toPersianDate(comment.created_at);
        return comment;
    })
    res.adminRender('admin/comments/index', {layout: 'admin', comments: presentComment, helpers: {
        commnetBackground: function(status, options){
            let cssClass;
            switch(true){
                case status == commentStatus.APPROVED:
                    cssClass += "alert alert-success"
                    break
                case status == commentStatus.REJECTED:
                    cssClass += "alert alert-warning"
                    break
            }
            return cssClass
        }
    }});

};
exports.approve = async (req, res) => {
    const commentId = req.params.commentId
    const result = await commentsModel.approve(commentId)
    res.redirect('/admin/comments')
}
exports.reject = async (req, res) => {
    const commentId = req.params.commentId
    const result = await commentsModel.reject(commentId)
    res.redirect('/admin/comments')
}
exports.delete = async (req, res) => {
    const commentId = req.params.commentId
    const result = await commentsModel.delete(commentId)
    res.redirect('/admin/comments')
}