import React, { useState } from "react"
import { StyleSheet, View, Text, TextInput } from "react-native"
import Card from "./Card"
import { FlatList } from "react-native-gesture-handler"
import { Picker } from "@react-native-picker/picker"

const days = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
//   ,
//   [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
//   [],
//   [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
// ]

const ExpenseApp = () => {
  const [selectedValue, setSelectedValue] = useState("week 1")
  const expense = 34
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(itemValue) => setSelectedValue(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Week 1" value="week 1" />
            <Picker.Item label="Week 2" value="week 2" />
            <Picker.Item label="Week 3" value="week 3" />
            <Picker.Item label="Week 4" value="week 4" />
            <Picker.Item label="Week 5" value="week 5" />
            <Picker.Item label="Week 6" value="week 6" />
            <Picker.Item label="Week 7" value="week 7" />
            <Picker.Item label="Week 8" value="week 8" />
            <Picker.Item label="Week 9" value="week 9" />
            <Picker.Item label="Week 10" value="week 10" />
          </Picker>
        </View>
        <View style={styles.remainder}>
          <Text
            style={[styles.name, { color: expense > 70 ? "red" : "green" }]}
          >
            {" "}
            {expense < 70 ? "+" : expense == 70 ? " " : "-"}{" "}
          </Text>
          <Text style={styles.remainderInput}>
            {expense > 70 ? expense - 70 : 70 - expense}
          </Text>
        </View>
      </View>
      <FlatList
        data={days}
        scrollEnabled
        keyExtractor={(index) => index.toString()}
        renderItem={({ item }) => <Card dayItem={item} />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  headerContainer: {
    flexDirection: "row",
    width: "100%",
    // backgroundColor: "lightgray",
  },
  name: {
    fontSize: 25,
    marginRight: "auto",
  },
  picker: {},
  pickerContainer: {
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 20,
    flex: 1,
    height: 60,
  },
  remainder: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 20,
    backgroundColor: "white",
    marginHorizontal: 10,
    width: 100,
    height: 60,
  },
  remainderInput: {
    flex: 1,
    fontWeight: "900",
    fontSize: 25,
  },
})

export default ExpenseApp
