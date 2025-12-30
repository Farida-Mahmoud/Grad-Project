import { useFormikContext } from "formik";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  ViewStyle
} from "react-native";
import colors from "../../config/colors.ts";
import { Ionicons } from "@expo/vector-icons";

type CustomFormFieldProps = {
  name: string;
  width?: number | string;
  label?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  options?: string[]; // ✅ Dropdown options
  placeholder?: string;
  rightLabel?: string;
  [key: string]: any;
};

function CustomFormField({
  name,
  label,
  width,
  icon,
  options,
  placeholder,
  rightLabel,
  ...otherProps
}: CustomFormFieldProps) {
  const { values, setFieldTouched, setFieldValue } =
    useFormikContext<Record<string, any>>();

  const [visible, setVisible] = useState(false);
  const containerStyle = [
  styles.inputContainer,
  width !== undefined ? ({ width } as ViewStyle) : {},
];

  const value = values[name];

  return (
    <>
      {/* Label row */}
      {label && (
        <View style={styles.labelRow}>
          <Text style={styles.label}>{label}</Text>
          {rightLabel && <Text style={styles.rightLabel}>{rightLabel}</Text>}
        </View>
      )}

      {/* Dropdown */}
      {options ? (
        <>
          <TouchableOpacity
            style={containerStyle}
            onPress={() => setVisible(true)}
            activeOpacity={0.8}
          >
            {icon && (
              <Ionicons
                name={icon}
                size={22}
                color={colors.darkGray}
                style={styles.icon}
              />
            )}
            <Text
              style={[
                styles.input,
                !value && { color: colors.gray },
              ]}
            >
              {value || placeholder}
            </Text>
            <Ionicons name="chevron-down" size={18} color={colors.darkGray} />
          </TouchableOpacity>

          {/* Modal */}
          <Modal transparent animationType="fade" visible={visible}>
            <TouchableOpacity
              style={styles.overlay}
              onPress={() => setVisible(false)}
              activeOpacity={1}
            >
              <View style={styles.modal}>
                {options.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.option}
                    onPress={() => {
                      setFieldValue(name, option);
                      setVisible(false);
                    }}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableOpacity>
          </Modal>
        </>
      ) : (
        /* Normal TextInput */
        <View style={containerStyle}>
          {icon && (
            <Ionicons
              name={icon}
              size={22}
              color={colors.darkGray}
              style={styles.icon}
            />
          )}
          <TextInput
            onBlur={() => setFieldTouched(name)}
            onChangeText={(text) => setFieldValue(name, text)}
            value={value ?? ""}
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={colors.gray}
            {...otherProps}
          />
        </View>
      )}
    </>
  );
}


const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightGray,
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 30,

    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  input: {
    flex: 1,
    paddingVertical: 13,
    fontSize: 16,
  },

  icon: {
    marginRight: 10,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
    marginBottom: 6,
    marginLeft: 5,
    alignSelf: "flex-start",
  }, 
  overlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.3)",
  justifyContent: "center",
  padding: 30,
},

modal: {
  backgroundColor: "#fff",
  borderRadius: 15,
  overflow: "hidden",
},

option: {
  padding: 16,
  borderBottomWidth: 1,
  borderBottomColor: "#eee",
},

optionText: {
  fontSize: 16,
},
 labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
    marginLeft: 5,
  },
  rightLabel: {
    fontSize: 14,
    color: colors.gray, 
    fontWeight: "500",
  },

});

export default CustomFormField;
export type { CustomFormFieldProps };
