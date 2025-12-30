
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AuthLayout from "../../components/layout/AuthLayout.tsx";
import AuthHeader from "../../components/auth/AuthHeader.tsx";
import colors from "../../config/colors.ts";
import AppButton from "../../components/lists/Button.tsx";

export default function VerificationScreen({ navigation }: any) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<TextInput[]>([]);

const handleChange = (text: string, index: number) => {
  const newCode = [...code];
  newCode[index] = text;
  setCode(newCode);

  if (text && index < 5) {
    inputs.current[index + 1].focus();
  }
};

  return (
    <AuthLayout onBack={() => navigation.goBack()}>
      {/* Header + Stepper */}
      <AuthHeader title="Verification" step={1} navigation={navigation} />

      <Text style={styles.mainTitle}>Check Your Email</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit code sent to your email
      </Text>

      {/* OTP */}
      <View style={styles.otpContainer}>
        {code.map((value, index) => (
          <TextInput
            key={index}
            ref={(ref) => {inputs.current[index] = ref!}}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={value}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                if (code[index] === "" && index > 0) {
                  inputs.current[index - 1].focus();
                }
              }
            }}
          />

        ))}
      </View>

      <Text style={styles.resendText}>
        Didn’t get a code? <Text style={styles.resend}>Resend</Text>
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("UserDetails")} >
         <Text style={styles.buttonText}>Verify</Text>
       </TouchableOpacity>
      
    </AuthLayout>
  );
}



const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    textAlign: "center",
    color: "#777",
    marginTop: 8,
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpInput: {
    width: 48,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#f2f2f2",
    textAlign: "center",
    fontSize: 18,
  },
  resendText: {
    textAlign: "center",
    color: "#777",
    marginBottom: 30,
  },
  resend: {
    color: colors.main,
    fontWeight: "600",
  },
  button: {
    backgroundColor: colors.main,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: "auto",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});


