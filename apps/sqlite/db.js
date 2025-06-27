import * as SQLite from "expo-sqlite"

const db = await SQLite.openDatabaseAsync("books.db")

export default db
