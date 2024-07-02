import * as React from "react";
import { GridProps, SwitchFieldProps } from "@aws-amplify/ui-react";
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
export declare type LoansCreateFormInputValues = {
    returned?: boolean;
};
export declare type LoansCreateFormValidationValues = {
    returned?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LoansCreateFormOverridesProps = {
    LoansCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    returned?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type LoansCreateFormProps = React.PropsWithChildren<{
    overrides?: LoansCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: LoansCreateFormInputValues) => LoansCreateFormInputValues;
    onSuccess?: (fields: LoansCreateFormInputValues) => void;
    onError?: (fields: LoansCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LoansCreateFormInputValues) => LoansCreateFormInputValues;
    onValidate?: LoansCreateFormValidationValues;
} & React.CSSProperties>;
export default function LoansCreateForm(props: LoansCreateFormProps): React.ReactElement;
