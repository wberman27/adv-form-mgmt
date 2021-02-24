import React, {useState, useEffect} from 'react'
import './App.css';
import Form from './Form';
import Schema from './Schema'
import axios from 'axios'
import * as yup from 'yup'
import { v4 as uuid } from 'uuid'

const initialFormValues = {
  //text input
  name: '',
  email: '',
  password: '',
  //checkbox
  tos: false,
}

const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  tos: false,
}
const initialUsers = [
  {
    id: uuid(),
    name: 'Will',
    email: 'william@email.com',
    password: 'hunter2',
    tos: true
  },
]
const initialDisabled = false

function App() {

  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getUsers = () => {
    axios.get('http://myapi.com/api/Users')
      .then(res =>{
        setUsers(res.data)
      })
      .catch(err =>{
        console.log(err)
      })
  }

  const postNewUser = newUser => {
    axios.post('http://myapi.com/api/Users', newUser)
      .then(res =>{
        console.log(res)
        // setUsers([res.data, ...users])
      })
      .catch(err =>{
        console.log(err)
      })
      setFormValues(initialFormValues)
  }

  const inputChange = (name, value) => {
    yup.reach(Schema, name)
      .validate(value)
      .then(() =>{
        setFormErrors({...formErrors, [name]: ''})
      })
      .catch(err =>{
        setFormErrors({...formErrors, [name]: err.errors[0]})
      })
      

    setFormValues({
      ...formValues,
      [name]: value
    })
  }

  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      tos: formValues.tos
    }
    postNewUser(newUser)
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    Schema.isValid(formValues).then(valid => setDisabled(!valid))

  }, [formValues])

  return (
    <div className="App">
      <h1>User Management App</h1>

      <Form 
      values={formValues}
      submit={formSubmit}
      change={inputChange}
      disabled={disabled}
      errors={formErrors}
      />

      {
        users.map(user =>{
          return (
            <div className = 'user'>
            <div className='userContainer'>
               <h2>{user.name}</h2>
               <p>Email: {user.email}</p>
               <p>Password: {user.password}</p>
            </div>
            </div>
          )
        })
      }


    </div>
  );
}

export default App;
