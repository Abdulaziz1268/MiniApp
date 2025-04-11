import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  ToastAndroid,
  Alert,
} from "react-native"
import TodoIcon from "../../assets/TodoIcon.png"
import ExpenseIcon from "../../assets/ExpenseIcon.png"
import * as Updates from "expo-updates"

const apps = [
  { name: "ToDoApp", icon: TodoIcon },
  { name: "ExpenseApp", icon: ExpenseIcon },
]

const Apps = ({ navigation }) => {
  const [cdown, setCdown] = useState(0)
  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const update = await Updates.checkForUpdateAsync()
        if (update.isAvailable) {
          try {
            await Updates.fetchUpdateAsync()
            await Updates.reloadAsync()
            ToastAndroid.show("successfully updated", ToastAndroid.SHORT)
          } catch (error) {
            console.log(error)
            ToastAndroid.show(error.message, ToastAndroid.SHORT)
          }
        }
      } catch (error) {
        console.log("Error checking for updates", error)
        ToastAndroid.show(error.message, ToastAndroid.SHORT)
      }
    }
    checkForUpdates()
  }, [])

  useEffect(() => {
    const now = new Date()
    const graduationDate = new Date("2025-06-22T00:00:00")
    setCdown(graduationDate - now)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Apps</Text>
      <View style={styles.appsContainer}>
        {apps.map((item, index) => (
          <TouchableOpacity
            style={styles.app}
            key={index}
            onPress={() => navigation.navigate(`${item.name}`)}
          >
            <Image
              source={item.icon}
              width={100}
              height={100}
              style={styles.image}
            />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.countDown}>
        <Text style={styles.contDownText}>{cdown}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  app: {
    width: 100,
    height: 100,
    backgroundColor: "cornflowerblue",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    color: "white",
    overflow: "hidden",
    elevation: 10,
  },
  appsContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  appText: {
    color: "white",
  },
  container: {
    flex: 1,
    position: "relative",
  },
  countDown: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 25,
    right: 25,
    width: 50,
    height: 50,
    backgroundColor: "white",
    elevation: 10,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "gray",
  },
  contDownText: {
    fontSize: 30,
  },
  header: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "900",
    margin: 15,
    backgroundColor: "gray",
    color: "white",
    padding: 5,
    borderRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
})

export default Apps
