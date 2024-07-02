import * as React from "react";
import { GridProps, SwitchFieldProps } from "@aws-amplify/ui-react";
import { Loans } from "./graphql/types";
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
export declare type LoansUpdateFormInputValues = {
    returned?: boolean;
};
export declare type LoansUpdateFormValidationValues = {
    returned?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type LoansUpdateFormOverridesProps = {
    LoansUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    returned?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type LoansUpdateFormProps = React.PropsWithChildren<{
    overrides?: LoansUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    loans?: Loans;
    onSubmit?: (fields: LoansUpdateFormInputValues) => LoansUpdateFormInputValues;
    onSuccess?: (fields: LoansUpdateFormInputValues) => void;
    onError?: (fields: LoansUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: LoansUpdateFormInputValues) => LoansUpdateFormInputValues;
    onValidate?: LoansUpdateFormValidationValues;
} & React.CSSProperties>;
export default function LoansUpdateForm(props: LoansUpdateFormProps): React.ReactElement;
