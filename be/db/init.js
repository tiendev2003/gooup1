// connect to mysql2
import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2003',
  database: 'gooup1',
})

export default connection
