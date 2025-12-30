import { useFormikContext } from "formik";
import React from "react";
import AppButton from "../lists/Button.tsx";

type SubmitButtonProps = {
  title: string;
};

function SubmitButton({ title }: SubmitButtonProps) {
const { handleSubmit } = useFormikContext<any>();

  return <AppButton title={title} onPress={handleSubmit} />;
}

export default SubmitButton;
