/**
 * Created by Walker on 2020/05/06.
 * 对操作不同表，sql语句的封装
 */
let login = {
    insert: "INSERT INTO login(id, username, password,sort) VALUES(?,?,?)",
    update: "UPDATE login SET username=?, password=? WHERE id=?",
    delete: "DELETE FROM login WHERE id=?",
    queryById: "SELECT * FROM login WHERE id=?",
    queryByUserName: "SELECT * FROM login WHERE username=?",
    queryAll: "SELECT * FROM login",
};

let memorandum = {
    insert: "INSERT INTO memorandum(message,user,date,shortTitle) VALUES(?,?,?,?)",
    update: "UPDATE memorandum SET message=? WHERE id=?",
    delete: "DELETE FROM memorandum WHERE id=?",
    queryById: "SELECT * FROM memorandum WHERE id=?",
    queryByUserName: "SELECT * FROM memorandum WHERE message=?",
    queryAll: "SELECT * FROM memorandum",
};

module.exports = {
    login,
    memorandum
};
