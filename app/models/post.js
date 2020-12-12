const db = require("../../database/mysql");


//pageination
exports.findAll = async (page = 1, perpage = 5) => {
  const offset = (page - 1) * perpage;
  const [rows, fields] = await db.query(`
        SELECT p.*,u.full_name
        FROM posts p
        LEFT JOIN users u ON p.author_id=u.id
        ORDER BY p.created_at DESC
        LIMIT ${offset},${perpage}
    `);
  return rows;
};
//pageination


exports.count = async () => {
  const [rows, fields] = await db.query(`
  SELECT COUNT(id) as countposts FROM posts
  `);
  return rows[0].countposts;
};
exports.find = async (postId) => {
  const [rows, fields] = await db.query(
    `
        SELECT p.*,u.full_name
        FROM posts p
        JOIN users u ON p.author_id=u.id
        WHERE p.id=? LIMIT 1
    `,
    [postId]
  );
  return rows.length > 0 ? rows[0] : false;
};
exports.create = async (postData) => {
  const [result] = await db.query(`INSERT INTO posts SET ?`, [postData]);
  return result.insertId;
};
exports.delete = async (postID) => {
  const [result] = await db.query(`DELETE FROM posts WHERE id=? LIMIT 1`, [
    postID,
  ]);
  return result.affectedRows > 0;
};
exports.update = async (postID, updatefield) => {
  const [result] = await db.query(`UPDATE posts SET ? WHERE id=? LIMIT 1`, [
    updatefield,
    postID,
  ]);
  return result.affectedRows > 0;
};
exports.findBySlug = async (postSlug) => {
  const [rows] = await db.query(
    `
  SELECT *
  FROM posts 
  WHERE slug=?
  LIMIT 1`,
    [postSlug]
  );
  return rows[0];
};
exports.findByKeyWord = async (key) => {
  const [rows, fields] = await db.query(
    `
        SELECT p.*,u.full_name
        FROM posts p
        LEFT JOIN users u ON p.author_id=u.id
        WHERE title LIKE ?
        ORDER BY p.created_at DESC
    `,
    ["%" + key + "%"]
  );
  return rows;
};
exports.latestPost = async (limit = 5) => {
  const [rows, fields] = await db.query(`
        SELECT p.*,u.full_name
        FROM posts p
        LEFT JOIN users u ON p.author_id=u.id
        ORDER BY p.created_at DESC
        LIMIT ${limit}
    `);
  return rows;
};
