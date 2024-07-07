/* eslint-disable */
"use client";
import * as React from "react";
import { Button, Flex, Grid, SwitchField } from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getLoans } from "./graphql/queries";
import { updateLoans } from "./graphql/mutations";
const client = generateClient();
export default function LoansUpdateForm(props) {
  const {
    id: idProp,
    loans: loansModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    returned: false,
  };
  const [returned, setReturned] = React.useState(initialValues.returned);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = loansRecord
      ? { ...initialValues, ...loansRecord }
      : initialValues;
    setReturned(cleanValues.returned);
    setErrors({});
  };
  const [loansRecord, setLoansRecord] = React.useState(loansModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getLoans.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getLoans
        : loansModelProp;
      setLoansRecord(record);
    };
    queryData();
  }, [idProp, loansModelProp]);
  React.useEffect(resetStateValues, [loansRecord]);
  const validations = {
    returned: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          returned,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateLoans.replaceAll("__typename", ""),
            variables: {
              input: {
                id: loansRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "LoansUpdateForm")}
      {...rest}
    >
      <SwitchField
        label="Returned"
        defaultChecked={false}
        isDisabled={false}
        isChecked={returned}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              returned: value,
            };
            const result = onChange(modelFields);
            value = result?.returned ?? value;
          }
          if (errors.returned?.hasError) {
            runValidationTasks("returned", value);
          }
          setReturned(value);
        }}
        onBlur={() => runValidationTasks("returned", returned)}
        errorMessage={errors.returned?.errorMessage}
        hasError={errors.returned?.hasError}
        {...getOverrideProps(overrides, "returned")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || loansModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || loansModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
