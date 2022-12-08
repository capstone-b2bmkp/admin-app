import { useContext } from 'react';
import { FieldHookConfig, useField } from 'formik';
import { ClassTypes, FormDefaultStyleContext } from './Form';


export type InputProps<T> = { label: string } & ClassTypes & FieldHookConfig<T>;

export default function Input<T>({ label, errorClassName, inputClassName, labelClassName, ...props }: InputProps<T>) {
  const [field, meta] = useField(props);
  const formStyle = useContext(FormDefaultStyleContext);
  const inputProps = { type: 'text', ...field, ...props };

  return (
    <>
      <label htmlFor={props.id || props.name} className={labelClassName || formStyle.labelClassName}>
        {label}
      </label>
      {/* @ts-ignore */}
      <input {...inputProps} className={inputClassName || formStyle.inputClassName} />
      {meta.touched && meta.error ? (
        <div className={errorClassName || formStyle.errorClassName}>{meta.error}</div>
      ) : null}
    </>
  );
}