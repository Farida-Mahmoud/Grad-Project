import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import colors from "../../config/colors.ts";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  color?: keyof typeof colors; 
};

function AppButton({ title, onPress, color = 'main' }: AppButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor:colors.main,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    
    padding: 10,
    width: '75%',
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    
  
  }
});

export default AppButton;
