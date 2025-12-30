import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AuthLayout from '../../components/layout/AuthLayout.tsx';
import AuthHeader from '../../components/auth/AuthHeader.tsx';
import CustomFormField from '../../components/forms/FormField.tsx';
import SubmitButton from '../../components/forms/SubmitButton.tsx';
import { Formik } from "formik";

function CreatePasswordScreen({ navigation , route}: any) {
  const { setIsLoggedIn } = route.params;
  return (
    <AuthLayout>
      <AuthHeader title="Create Password" step={3} navigation={navigation} />

      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
       onSubmit={(values) => {
        console.log(values);
         setIsLoggedIn(true);
  
      }}
      >
        {() => (
          <>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Set up your password</Text>

              <CustomFormField
                name="password"
                label="Password"
                placeholder="Enter your password"
                secureTextEntry
              />

              <CustomFormField
                name="confirmPassword"
                label="Confirm password"
                placeholder="Enter your password"
                secureTextEntry
              />
            </View>

            <View style={styles.footer}>
              <SubmitButton title="Next" />
            </View>
          </>
        )}
      </Formik>
    </AuthLayout>
  );
}


const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 25,
  },

  footer: {
    alignItems: "center",
    paddingBottom: 20,
  },
});

export default CreatePasswordScreen;