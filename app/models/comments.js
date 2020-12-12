const db = require('../../database/mysql')
const { post } = require('../routes/front/post')
const commentstatus = require('./commentstatus')
exports.findAll = async () => {
  const [rows, fields] = await db.query(`
        SELECT c.*, p.title
        FROM comments c
        JOIN posts p ON c.post_id=p.id
        ORDER BY c.created_at DESC
    `)
  return rows
}
exports.find = async (postId) => {
  const [rows, fields] = await db.query(
    `
        SELECT p.*,u.full_name
        FROM posts p
        JOIN users u ON p.author_id=u.id
        WHERE p.id=? LIMIT 1
    `,
    [postId],
  )
  return rows.length > 0 ? rows[0] : false
}
exports.create = async (commentData) => {
  const [result] = await db.query(`INSERT INTO comments SET ?`, [commentData])
  return result.insertId
}
exports.delete = async (commentId) => {
  const [result] = await db.query(`DELETE FROM comments WHERE id=? LIMIT 1`, [
    commentId,
  ])
  return result.affectedRows > 0
}
exports.update = async (postID, updatefield) => {
  const [result] = await db.query(`UPDATE posts SET ? WHERE id=? LIMIT 1`, [
    updatefield,
    postID,
  ])
  return result.affectedRows > 0
}
exports.approve = async (commentId)=>{
  const [result] = await db.query(`UPDATE comments SET status=? WHERE id=? LIMIT 1`, [commentstatus.APPROVED, commentId])
  return result.affectedRows > 0
}
exports.reject = async (commentId)=>{
  const [result] = await db.query(`UPDATE comments SET status=? WHERE id=? LIMIT 1`, [commentstatus.REJECTED, commentId])
  return result.affectedRows > 0
}
exports.findByPostId = async (postId, status=commentstatus.APPROVED) => {
  const [rows] = await db.query(`
  SELECT * FROM comments WHERE post_id=? AND status=?
  `, [postId, status])
  return rows;
}