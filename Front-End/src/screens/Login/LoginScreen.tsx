import React from "react";
import { View,TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Screen from "../../components/lists/Screen.tsx";
import CustomForm from "../../components/forms/Form.tsx";
import CustomFormField from "../../components/forms/FormField.tsx";
import SubmitButton from "../../components/forms/SubmitButton.tsx";
import colors from "../../config/colors.ts";


function LoginScreen({ navigation }: any) {
  return (
    <Screen>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={24}
          color="#fff"
          style={styles.backIcon}
        />

        <Image
          source={require("../../assets/login2.png")}
          style={styles.image}
        />
      </View>

      {/* Card */}
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>

        <CustomForm
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => console.log(values)}
        >
          <>
            <CustomFormField
              name="email"
              label="Email"
               icon="mail"
              placeholder="Enter your email"
              keyboardType="email-address"
              
            />

            <CustomFormField
              name="password"
              label="Password"
              icon="lock-closed"
              placeholder="Enter your password"
              secureTextEntry
            />
            <Text style={styles.forgotPassword}>
  Forgot Password?
</Text>

<View style={styles.buttonContainer}>
  <SubmitButton title="Login" />
</View>
<View style={styles.registerContainer}>
  <Text style={styles.registerText}>Don’t have an account? </Text>

  <TouchableOpacity onPress={() => navigation.navigate("RegisterEmail")}>
    <Text style={styles.registerLink}>Register</Text>
  </TouchableOpacity>
</View>



          </>
        </CustomForm>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 240,
    backgroundColor: colors.main,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: "flex-end",
    alignItems: "center",
  },

  backIcon: {
    position: "absolute",
    top: 40,
    left: 20,
  },

  image: {
    width: 220,
    height: 220,
    resizeMode: "contain",
    position: "absolute",
    zIndex: 1,
  },

  card: {
    backgroundColor: "#fff",
  flex: 1,
      position: "absolute",
    top: 213,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 25,
    padding: 20,

  
    marginBottom: 0,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.main,
    marginBottom: 40,
  marginTop: 20,
  },
buttonContainer: {
  alignItems: "center",

},

forgotPassword: {
  alignSelf: "flex-end",
  color: colors.darkGray,
  fontSize: 14,
  marginTop: -20,
  marginBottom: 20,
  marginRight: 5,
},
registerContainer: {
  flexDirection: "row",
  justifyContent: "center",
},

registerText: {
  fontSize: 14,
  color: colors.gray,
},

registerLink: {
  fontSize: 14,
  color: colors.main,
  fontWeight: "bold",
},



});


export default LoginScreen;
