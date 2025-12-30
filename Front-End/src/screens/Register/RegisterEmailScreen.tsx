import React from "react";
import { useState } from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import AuthLayout from "../../components/layout/AuthLayout.tsx";
import CustomForm from "../../components/forms/Form.tsx";
import CustomFormField from "../../components/forms/FormField.tsx";
import SubmitButton from "../../components/forms/SubmitButton.tsx";
import colors from "../../config/colors.ts";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";


export default function RegisterEmailScreen({ navigation }: any) {

const [errorMessage , setErrorMessage] = useState("");

// Allowed Domains
const allowedDomains = ["example.com" , "mydomain.org"];

const handleSubmit = async (values:{email:string}) => {
  const {email} = values ;

  try {
    const response = await axios.post("http:" , {email});
    setErrorMessage("");
    // Alert.alert("Success" , response.data.message);
    navigation.navigate("Verification");
  } catch (error: any)
  {
if (error.response && error.response.data.message)
{
  setErrorMessage(error.response.data.message);
} else{
  setErrorMessage("Something Went Wrong Please try again");
}
  }



};
  return (
    <AuthLayout>
      
      <View style={styles.cardHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>

        <Text style={styles.cardTitle}>Create Account</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* Stepper */}
      <View style={styles.stepper}>
        <View style={styles.activeDot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>

    <CustomForm
  initialValues={{ email: "" }}
  onSubmit={() => navigation.navigate("Verification")}
   
>
  <>
    {/* Content */}
    <View style={styles.content}>
      <Text style={styles.title}>Let’s start with your email</Text>
      <Text style={styles.subtitle}>
        This will be used to login and recover your account
      </Text>

      <CustomFormField
        name="email"
        label="Email"
        placeholder="name@example.com"
      />
    </View>

    {/* Footer */}
    <View style={styles.footer}>
      <SubmitButton title="Next" />

      <View style={styles.loginRow}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  </>
</CustomForm>

    </AuthLayout>
  );
}


const styles = StyleSheet.create({
   cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },

  stepper: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ddd",
    marginRight: 8,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.main,
    marginRight: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: colors.gray,
    marginBottom: 30,
  },

  content: {
    flex: 1,
    marginTop: 15,
  },

footer: {
  justifyContent: "flex-end",
  paddingBottom: 20,
  alignItems: "center",
},

  loginRow: {
    flexDirection: "row",
    
  },

  loginText: {
    color: colors.gray,
    fontSize: 14,
  },

  loginLink: {
    color: colors.main,
    fontWeight: "600",
    fontSize: 14,
  },
})


