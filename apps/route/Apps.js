import React, { useEffect } from "react"
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
  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const update = await Updates.checkForUpdateAsync()
        if (update.isAvailable) {
          Alert.alert("Update Available!", "Do you want to update now?", [
            {
              text: "Later",
              onPress: () =>
                ToastAndroid.show("update postponed", ToastAndroid.SHORT),
            },
            {
              text: "Update",
              onPress: async () => {
                ToastAndroid.show("update started", ToastAndroid.SHORT)
                try {
                  await Updates.fetchUpdateAsync()
                  await Updates.reloadAsync()
                  ToastAndroid.show("successfully updated", ToastAndroid.SHORT)
                } catch (error) {
                  Alert.alert("Update failed!", "please try again later.")
                  console.log(error)
                  ToastAndroid.show("update failed", ToastAndroid.SHORT)
                }
              },
            },
          ])
        }
        if (!update.isAvailable)
          ToastAndroid.show("your app is up to date", ToastAndroid.SHORT)
      } catch (error) {
        console.log("Error checking for updates", error)
        ToastAndroid.show(
          `error checking for updates ${error.message}`,
          ToastAndroid.SHORT
        )
      }
    }
    checkForUpdates()
  }, [])
  return (
    <>
      <Text style={styles.header}>Apps</Text>
      <View style={styles.container}>
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
    </>
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
  appText: {
    color: "white",
  },
  container: {
    flex: 1,
    paddingTop: 25,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
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
