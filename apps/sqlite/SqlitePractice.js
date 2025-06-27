import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import db from "./db"

const SqlitePractice = () => {
  const [books, setBooks] = useState([])
  const [bookName, setBookName] = useState("")

  useEffect(() => {
    const createTable = async () => {
      try {
        await db.execAsync(
          "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);"
        )
      } catch (error) {
        console.log(error.message)
      }
    }

    createTable()
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const rows = await db.getAllAsync("SELECT * FROM books")
      setBooks(rows)
    } catch (error) {
      console.log(error.message)
    }
  }

  const addBook = async () => {
    try {
      await db.runAsync("INSERT INTO books (name) VALUES (?);", [bookName])
      fetchBooks()
      setBookName("")
    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteBook = async (id) => {
    try {
      await db.runAsync("DELETE FROM books WHERE id = (?);", [id])
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <View style={styles.container}>
      <Text>sqlite</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "skyblue",
    height: 200,
    width: 200,
  },
})

export default SqlitePractice
