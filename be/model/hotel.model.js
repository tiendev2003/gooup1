import connection from "../db/init.js";

class Hotel {
    constructor(hotel) {
        this.name = hotel.name;
        this.price = hotel.price;
    }
    static create(newHotel, result) {
        connection.query("INSERT INTO hotels SET ?", newHotel, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            console.log("created hotel: ", { id: res.insertId, ...newHotel });
            result(null, { id: res.insertId, ...newHotel });
        });
    }

    static getAll(result) {
        connection.query("SELECT id, name, price FROM hotels", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

        
            result(null, res);  
        });
    }

    static updateById(id, hotel, result) {
        connection.query(
            "UPDATE hotels SET name = ?, price = ? WHERE id = ?",
            [hotel.name, hotel.price, id],
            (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                if (res.affectedRows == 0) {
                   
                    result({ kind: "not_found" }, null);
                    return;
                }

                console.log("updated hotel: ", { id: id, ...hotel });
                result(null, { id: id, ...hotel });
            }
        );
    }

    static remove(id, result) {
        connection.query("DELETE FROM hotels WHERE id = ?", id, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
               
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted hotel with id: ", id);
            result(null, res);
        });
    }

    static removeAll(result) {
        connection.query("DELETE FROM hotels", (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log(`deleted ${res.affectedRows} hotels`);
            result(null, res);
        });
    }

    static findById(id, result) {
        connection.query(`SELECT id,name,price FROM hotels WHERE id = ${id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            if (res.length) {
                console.log("found hotel: ", res[0]);
                result(null, res[0]);
                return;
            }

            // not found Hotel with the id
            result({ kind: "not_found" }, null);
        });
    }

}

export default Hotel
