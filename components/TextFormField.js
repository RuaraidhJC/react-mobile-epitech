import { FieldProps, getIn } from "formik"
import React from 'react'
import { TextInput } from 'react-native'
import { Input } from 'react-native-elements'

export const TextFormField = ({
    field,
    form,
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    ...props
}) => {
    const errorText = getIn(form.touched, field.name) && getIn(form.errors, field.name);

    return (
        <TextInput
            fullWidth
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
           
            {...field}
            {...props}
        />
            
    )
}