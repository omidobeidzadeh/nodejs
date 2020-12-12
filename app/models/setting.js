const db = require('../../database/mysql');
exports.findAll = async (columns=[]) => {
    const sqlculumns = columns.length > 0 ? columns.join(',') : '*';
    const [rows, fields] = await db.query(`
        SELECT ${sqlculumns} FROM settings
    `) 
    return rows;
};
exports.update = async (updatefield) => {
    const updateQuery = Object.keys(updatefield).forEach(setting_name => {
        db.query(`UPDATE settings SET setting_value=? WHERE setting_name=?`, [updatefield[setting_name], setting_name])

    })
}
exports.get = async (key) => {
    const [rows] = await db.query(`
        SELECT setting_value FROM settings WHERE setting_name=?
    `, [key])
    return rows.length > 0 ? rows[0].setting_value : null;
}
