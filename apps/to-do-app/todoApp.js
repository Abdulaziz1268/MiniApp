import { StatusBar } from "expo-status-bar"
import { useEffect, useState } from "react"
import {
  FlatList,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { Formik } from "formik"
import AsyncStorage from "@react-native-async-storage/async-storage"

const ToDoApp = () => {
  const [todos, setTodos] = useState([])
  const [modal, setModal] = useState(false)
  const [pressed, setPressed] = useState([])
  const [crossed, setCrossed] = useState(false)

  const saveData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.log("error saving data", error)
    }
  }
  useEffect(() => {
    const getData = async (key) => {
      try {
        const data = await AsyncStorage.getItem(key)
        if (data !== null) {
          setTodos(JSON.parse(data))
        }
      } catch (error) {
        console.log("cannot retrieve data", error)
      }
    }

    getData("todos")
  }, [])

  const handlePress = (key) => {
    setPressed((prevState) =>
      prevState.includes(key)
        ? prevState.filter((item) => item !== key)
        : [...prevState, key]
    )
  }

  const handleDelete = (key) => {
    setTodos(todos.filter((item) => item.key !== key))
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.header}>Daily Activity</Text>

      <Modal visible={modal} animationType="slide">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.modalContainer}>
            <View style={styles.closeContainer}>
              <MaterialIcons
                name="close"
                style={styles.closeIcon}
                size={34}
                color="black"
                onPress={() => setModal(false)}
              />
            </View>
            <Text style={styles.inputHeader}>Input activity</Text>

            <Formik
              initialValues={{ activity: "" }}
              onSubmit={(val) => {
                const todo = {
                  text: val.activity,
                  key: Math.floor(Math.random() * 1000).toString(),
                }
                const updatedTodos = [...todos, todo]
                setTodos(updatedTodos)
                saveData("todos", updatedTodos)
                setModal(false)
              }}
            >
              {(props) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter activity"
                    onChangeText={props.handleChange("activity")}
                    value={props.values.activity}
                  />
                  <MaterialIcons
                    name="add"
                    size={70}
                    color="lightgray"
                    style={styles.modalAdd}
                    onPress={() => {
                      props.handleSubmit()
                      //props.resetForm()
                      setModal(false)
                    }}
                  />
                </View>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View style={styles.todoItem}>
        {todos.length > 0 ? (
          <FlatList
            data={todos}
            renderItem={({ item }) => {
              const keyExist = pressed.includes(item.key)
              return (
                <TouchableOpacity
                  onPress={() => handlePress(item.key)}
                  style={styles.items}
                >
                  <View style={styles.itemsContainer}>
                    <Text
                      style={keyExist ? styles.crossedText : styles.listText}
                    >
                      {item.text}
                    </Text>
                    <MaterialIcons
                      name="delete"
                      size={25}
                      color="black"
                      style={styles.deleteIcon}
                      onPress={() => handleDelete(item.key)}
                    />
                  </View>
                </TouchableOpacity>
              )
            }}
          />
        ) : (
          <Text style={{ textAlign: "center" }}>No tasks yet</Text>
        )}
      </View>
      <MaterialIcons
        name="add"
        size={30}
        color="lightgray"
        style={styles.addButton}
        onPress={() => setModal(true)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 50,
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 30,
  },
  items: {
    height: 70,
    backgroundColor: "lightgray",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: "center",
    elevation: 3, // Adds shadow for Android
    shadowColor: "#000", // Adds shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  itemsContainer: {
    paddingRight: 22,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  crossedText: {
    textDecorationLine: "line-through",
  },
  todoItem: {
    width: "90%",
  },
  addButton: {
    position: "absolute",
    bottom: 40,
    right: 40,
    // borderWidth: 2,
    borderRadius: 50,
    padding: 10,
    backgroundColor: "gray",
  },
  modalAdd: {
    borderRadius: 50,
    padding: 10,
    backgroundColor: "gray",
  },
  inputContainer: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 2,
    borderColor: "lightgray",
    height: 50,
    width: "90%",
    marginVertical: 20,
    borderRadius: 20,
    marginBottom: 50,
    paddingLeft: 20,
  },
  inputHeader: {
    paddingTop: 100,
    textAlign: "center",
    marginBottom: 50,
    fontSize: 30,
  },
  closeContainer: {
    marginTop: 10,
  },
  closeIcon: {
    width: 40,
    marginLeft: "auto",
    marginRight: 10,
  },
})

export default ToDoApp
