import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {
    GoogleSignin
} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';

const UserDetailScreen = () => {
    const [fullname, setFullname] = useState('')
    const [age, setAge] = useState('')

    const navigation = useNavigation()

    const handleSubmit = async () => {
        if (fullname !== "" && age !== "") {
            const currentUser = await GoogleSignin.getCurrentUser();

            let userInfo = {
                name: fullname,
                age: age,
                email: currentUser.user.email
            }

            await firestore().collection("users").add(userInfo).then((snap)=>snap.get()).then(uData=>uData.data());

            navigation.replace("Home")
        } else {
            alert("All Fields Required");
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>
                <Text style={{ color: "black" }}>Enter Full Name</Text>

                <TextInput
                    placeholder="Full name"
                    value={fullname}
                    onChangeText={text => setFullname(text)}
                    style={styles.input}
                />
                <Text style={{ color: "black" }}>Enter Age</Text>
                <TextInput
                    placeholder="Age"
                    value={age}
                    onChangeText={text => setAge(text)}
                    style={styles.input}
                    keyboardType={'number-pad'}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default UserDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        color:"black",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },
})