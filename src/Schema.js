import * as yup from 'yup' //allows access to yup functions and methods

const Schema = yup.object().shape({
    name: yup.string()
        .trim() // gets rid of white space in string
        .required('Name is required.') //error msg
        .min(3, 'Name must be at least 3 characters.'), //minimum characters required
    email: yup.string()
        .email('Must be a valid email address.')
        .required('Email is required.'),
    password: yup.string()
        .trim()
        .required('Password is required.')
        .min(6, 'Password must be at least 6 characters.'),

    tos: yup.boolean()
        .oneOf([true], 'You must have read and agreed to the Terms of Service.') //if not one of items in array

})

export default Schema