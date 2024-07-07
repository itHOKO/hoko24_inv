import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Tools } from "./graphql/types";
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
export declare type ToolsUpdateFormInputValues = {
    name?: string;
    description?: string;
    position?: string;
};
export declare type ToolsUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    description?: ValidationFunction<string>;
    position?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ToolsUpdateFormOverridesProps = {
    ToolsUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    position?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ToolsUpdateFormProps = React.PropsWithChildren<{
    overrides?: ToolsUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    tools?: Tools;
    onSubmit?: (fields: ToolsUpdateFormInputValues) => ToolsUpdateFormInputValues;
    onSuccess?: (fields: ToolsUpdateFormInputValues) => void;
    onError?: (fields: ToolsUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ToolsUpdateFormInputValues) => ToolsUpdateFormInputValues;
    onValidate?: ToolsUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ToolsUpdateForm(props: ToolsUpdateFormProps): React.ReactElement;
