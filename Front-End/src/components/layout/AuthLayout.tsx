import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../config/colors.ts";

type Props = {
  children: React.ReactNode;
  onBack?: () => void;
  showBack?: boolean;
};

export default function AuthLayout({ children, onBack, showBack = true }: Props) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        
      </View>

      {/* Card */}
      <View style={styles.card}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.main },

  header: {
    height: 100,
    justifyContent: "flex-end",
    alignItems: "center",
  },



  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
  },
});
