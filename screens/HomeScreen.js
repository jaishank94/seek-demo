import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  GoogleSignin
} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [fullname, setFullname] = useState('')

  useEffect(() => {
    async function fetchData() {
      const currentUser = await GoogleSignin.getCurrentUser();

      if (currentUser) {
        let isAlreadyExists = await firestore().collection("users").where('email', '==', currentUser.user.email).get().then((doc) => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }).catch((error) => {
          console.log("Error getting document:", error);
        });

        setFullname(currentUser.user.name)
      }
    }
    fetchData();
  }, []);

  const handleSignOut = () => {
    GoogleSignin
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: "black" }}>Full Name: {fullname}</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})