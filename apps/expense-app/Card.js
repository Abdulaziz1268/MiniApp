import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, TextInput } from "react-native"

const Card = ({ dayItem }) => {
  const [expense, seExpense] = useState(0)
  const d = new Date(2025, 3, dayItem)
  const day = d.toLocaleDateString("en-un", { weekday: "long" })

  const handleChange = (text) => {
    seExpense(text)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{day}</Text>
      <TextInput
        style={styles.expenseInput}
        onChangeText={handleChange}
        keyboardType="numeric"
      />
      <View style={styles.remainder}>
        <Text style={[styles.name, { color: expense > 70 ? "red" : "green" }]}>
          {" "}
          {expense < 70 ? "+" : expense == 70 ? " " : "-"}{" "}
        </Text>
        <Text style={styles.remainderInput}>
          {expense > 70 ? expense - 70 : 70 - expense}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    borderRadius: 20,
    // borderWidth: 1,
    // borderColor: "lightgray",
    padding: 10,
    backgroundColor: "white",
    elevation: 10,
    marginVertical: 5,
  },
  expenseInput: {
    borderWidth: 3,
    borderColor: "gray",
    borderRadius: 20,
    backgroundColor: "white",
    marginHorizontal: 10,
    width: 80,
    paddingLeft: 10,
    fontWeight: "900",
    fontSize: 18,
    height: 50,
  },
  name: {
    fontSize: 25,
    marginRight: "auto",
  },
  remainder: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "gray",
    borderRadius: 20,
    backgroundColor: "white",
    marginHorizontal: 10,
    width: 80,
    height: 50,
  },
  remainderInput: {
    flex: 1,
    fontWeight: "900",
    fontSize: 18,
  },
})

export default Card
