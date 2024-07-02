import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Person } from "./graphql/types";
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
export declare type PersonUpdateFormInputValues = {
    name?: string;
    role?: string;
};
export declare type PersonUpdateFormValidationValues = {
    name?: ValidationFunction<string>;
    role?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type PersonUpdateFormOverridesProps = {
    PersonUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    role?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type PersonUpdateFormProps = React.PropsWithChildren<{
    overrides?: PersonUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    person?: Person;
    onSubmit?: (fields: PersonUpdateFormInputValues) => PersonUpdateFormInputValues;
    onSuccess?: (fields: PersonUpdateFormInputValues) => void;
    onError?: (fields: PersonUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: PersonUpdateFormInputValues) => PersonUpdateFormInputValues;
    onValidate?: PersonUpdateFormValidationValues;
} & React.CSSProperties>;
export default function PersonUpdateForm(props: PersonUpdateFormProps): React.ReactElement;
