import React, {useState, useEffect} from 'react'
import './App.css';
import Form from './Form';
import Schema from './Schema'
import axios from './fake-api/myapi'
import * as yup from 'yup'
import './fake-api/myapi'
import {initialUsers} from './fake-api/myapi'

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

const initialDisabled = false

function App() {

  const [users, setUsers] = useState([])
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
        setUsers([res.data, ...users])
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
         <h2>Current Users:</h2>
      {
        users.map(user =>{
          return (   
          <div className = 'cardContainer'>
            <div className = 'userContainer'>
              <div className='user'>
                
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Password: {user.password} //Dev Note: DO NOT RENDER TO PAGE!</p> {/*this is a joke, ha ha*/}
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
