import React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import CustomFormField from '../../components/forms/FormField.tsx';
import SubmitButton from '../../components/forms/SubmitButton.tsx';
import AuthHeader from '../../components/auth/AuthHeader.tsx';
import AuthLayout from '../../components/layout/AuthLayout.tsx';
import { Formik } from 'formik';
import axios from 'axios';


function UserDetailsScreen({ navigation }: any) {

  const[errorMessage , setErrorMessage] = useState("");

  return (
    <AuthLayout>
      <AuthHeader title="Your Details" step={2} navigation={navigation} />

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          gender: "",
          age: "",
          location: "",
        }}
       onSubmit={async(values) => {
        try{
          const response = await axios.post(
            "http://YOUR_BACKEND_URL/register",
            values
          );
          setErrorMessage("");
          alert(response.data.message);
          navigation.navigate("CreatePassword");
      } catch(error:any){
        if(error.response && error.response.data.message){
          setErrorMessage(error.response.data.message);
        }
        else{
          setErrorMessage("Something Went Wrong Please Try Again");
        }
      }
    }}
      >
        {({handleSubmit}) => (
          <>
            <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
              <Text style={styles.title}>Tell us more about yourself</Text>

                  <CustomFormField
            name="firstName"
            label="First name"
            placeholder="Enter your first name"
          />

          <CustomFormField
            name="lastName"
            label="Last name"
            placeholder="Enter your last name"
          />
          <CustomFormField
            name="gender"
            label="Gender"
            placeholder="Select gender"
            options={["Male", "Female"]}
          />


          <CustomFormField
            name="age"
            label="Age"
            placeholder="Enter your age"
              keyboardType="numeric"

          />

          <CustomFormField
            name="location"
            label="Location"
            placeholder="Enter your location"
            rightLabel="Optional"
          />

            </ScrollView>

          <View style={styles.footer}>
              <SubmitButton  title="Next" />
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

export default UserDetailsScreen;