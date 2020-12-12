const db = require('../../database/mysql');
const hashService = require('../services/hashService');
const { findBySlug } = require('./post');
exports.findAll = async (columns=[]) => {
    // [id, full_name] => id,fullname : *
    const sqlculumns = columns.length > 0 ? columns.join(',') : '*';
    const [rows, fields] = await db.query(`
        SELECT ${sqlculumns} FROM users
    `) 
    return rows;
};
exports.create = async (userData) => {
    const hashPasword = hashService.hashPassword(userData.password)
    const updateUserData = {...userData, password: hashPasword}
    const [result] = await db.query(`INSERT INTO users set ?`, [updateUserData])
    return result.insertId
}
exports.delete = async (userID) => {
    const [result] = await db.query(`DELETE FROM users WHERE id=? LIMIT 1`, [userID]);
    return result.affectedRows > 0;
};
  exports.update = async (userID, updatefield) => {
    const [result] = await db.query(`UPDATE users SET ? WHERE id=? LIMIT 1`, [updatefield, userID]);
    return result.affectedRows > 0;
};
exports.find = async (userId) => {
    const [rows, fields] = await db.query(`
          SELECT u.*
          FROM users u
          WHERE u.id=? LIMIT 1
      `, [userId]);
    return rows.length > 0 ? rows[0]:false;
};
exports.findById = async (userId) => {
    const [rows] = await db.query(`
        SELECT * FROM users WHERE id=? LIMIT 1
    `, [userId])
    return rows.length === 1 ? rows[0] : null;
}
