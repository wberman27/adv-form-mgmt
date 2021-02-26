import React, {useState, useEffect} from 'react'
import './App.css';
import Form from './Form';
import Schema from './Schema'
import axios from './fake-api/myapi'
import * as yup from 'yup'
import './fake-api/myapi'
import { v4 as uuid } from 'uuid'

const initialFormValues = { //starting form values
  name: '',
  email: '',
  password: '',
  tos: false, //a checkbox
}

const initialFormErrors = { //starting error values
  name: '',
  email: '',
  password: '',
  tos: false,
}

const initialDisabled = false

function App() {

  //setting states for users, forms, error, and button availability
  const [users, setUsers] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  //get users from api, set users to the data in api
  const getUsers = () => {
    axios.get('http://myapi.com/api/Users')
      .then(res =>{
        setUsers(res.data)
      })
      .catch(err =>{
        console.log(err)
      })
  }
  //give new user to api, set users to new array of users
  const postNewUser = newUser => {
    axios.post('http://myapi.com/api/Users', newUser)
      .then(res =>{
        setUsers([res.data, ...users])
      })
      .catch(err =>{
        console.log(err)
      })
      setFormValues(initialFormValues) //reset forms
  }
  //on input change check schema for errors, set form errors to array new errors
  const inputChange = (name, value) => {
    yup.reach(Schema, name)
      .validate(value)
      .then(() =>{
        setFormErrors({...formErrors, [name]: ''})
      })
      .catch(err =>{
        setFormErrors({...formErrors, [name]: err.errors[0]})
      })
      
  //on input change set form values to those values
    setFormValues({
      ...formValues,
      [name]: value
    })
  }
  //on submit make new user from each form values, name, email, password respectively
  const formSubmit = () => {
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
    }
    postNewUser(newUser) //post to api
  }

  useEffect(() => { //get users invoked
    getUsers()
  }, [])

  useEffect(() => {
    Schema.isValid(formValues).then(valid => setDisabled(!valid))

  }, [formValues]) //if schema is valid, then invoke setdisabled with opposite of valid, each time formValues state changes

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
      <h2>Current Users:</h2>
      { 
        users.map(user =>{
          return (   
          <div className = 'cardContainer' key = {uuid}>
            <div className = 'userContainer'>
              <div className='user'>
                
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Password: {user.password} ////Dev Note: ⚠ DO NOT RENDER TO PAGE! ⚠</p> {/*this is a joke, ha ha*/}
              </div>
            </div>
          </div>
          )
        })
      }


    </div>
  );
}

export default App;
