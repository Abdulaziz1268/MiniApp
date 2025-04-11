import React from "react"
import { StyleSheet, View, Text, TextInput } from "react-native"

const ExpenseApp = () => {
  const d = new Date()
  const day = d.toLocaleDateString("en-un", { weekday: "long" })
  return (
    <View>
      <Text style={styles.name}>{day}</Text>
      <TextInput style={styles.expenseInput} />
      <TextInput style={styles.expenseInput} />
    </View>
  )
}

const styles = StyleSheet.create({
  expenseInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    backgroundColor: "white",
    elevation: 10,
    marginHorizontal: 10,
  },
  name: {
    fontSize: 18,
  },
})

export default ExpenseApp
