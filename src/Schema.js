import * as yup from 'yup'

const Schema = yup.object().shape({
    name: yup.string()
        .trim()
        .required('Name is required.')
        .min(3, 'Name must be at least 3 characters.'),
    email: yup.string()
        .email('Must be a valid email address.')
        .required('Email is required.'),
    password: yup.string()
    .trim()
    .required('Password is required.')
    .min(6, 'Password must be at least 6 characters.'),

    tos: yup.boolean()
    .oneOf([true], 'You must have read and agreed to the Terms of Service.')

})

export default Schema