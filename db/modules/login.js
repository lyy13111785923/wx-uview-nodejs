/**
 * Created by Walker on 2020/05/06.
 * 对操作不同表，sql语句的封装
 */
let login = {
    insert: "INSERT INTO login(id, username, password,sort) VALUES(?,?,?)",
    update: "UPDATE login SET username=?, password=? WHERE id=?",
    delete: "DELETE FROM login WHERE id=?",
    queryById: "SELECT * FROM login WHERE id=?",
    queryAll: "SELECT * FROM login",
};

let memorandum = {
    insert: "INSERT INTO memorandum(message) VALUES(?)",
    update: "UPDATE memorandum SET message=? WHERE id=?",
    delete: "DELETE FROM memorandum WHERE id=?",
    queryById: "SELECT * FROM memorandum WHERE id=?",
    queryAll: "SELECT * FROM memorandum",
};

module.exports = {
    login,
    memorandum
};
