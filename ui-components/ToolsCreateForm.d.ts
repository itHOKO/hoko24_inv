import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ToolsCreateFormInputValues = {
    name?: string;
    description?: string;
    position?: string;
};
export declare type ToolsCreateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    position?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ToolsCreateFormOverridesProps = {
    ToolsCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    position?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ToolsCreateFormProps = React.PropsWithChildren<{
    overrides?: ToolsCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ToolsCreateFormInputValues) => ToolsCreateFormInputValues;
    onSuccess?: (fields: ToolsCreateFormInputValues) => void;
    onError?: (fields: ToolsCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ToolsCreateFormInputValues) => ToolsCreateFormInputValues;
    onValidate?: ToolsCreateFormValidationValues;
} & React.CSSProperties>;
export default function ToolsCreateForm(props: ToolsCreateFormProps): React.ReactElement;
