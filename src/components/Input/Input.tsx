import React, { useId } from "react";
import clsx from "clsx";
import styles from "./Input.module.css";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
  hideLabel?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      hideLabel = false,
      className,
      required,
      disabled,
      ...props
    },
    ref,
  ) => {
    const inputId = useId();
    const errorId = useId();
    const helperId = useId();

    const describedBy = [error ? errorId : null, helperText ? helperId : null]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={styles.inputWrapper}>
        <label
          htmlFor={inputId}
          className={clsx(styles.label, hideLabel && styles.visuallyHidden)}
        >
          {label}
          {required && (
            <span className={styles.required} aria-label="required">
              *
            </span>
          )}
        </label>

        <input
          ref={ref}
          id={inputId}
          className={clsx(styles.input, error && styles.inputError, className)}
          aria-invalid={!!error}
          aria-describedby={describedBy || undefined}
          aria-required={required}
          disabled={disabled}
          {...props}
        />

        {helperText && !error && (
          <p id={helperId} className={styles.helperText}>
            {helperText}
          </p>
        )}

        {error && (
          <p id={errorId} className={styles.errorText} role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
