import React, {useState, useEffect} from 'react'
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import axios from 'axios'
import * as yup from 'yup'

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
const initialUsers = []
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
    // 🔥 STEP 6- IMPLEMENT! ON SUCCESS ADD NEWLY CREATED User TO STATE
    //    helper to [POST] `newUser` to `http://buddies.com/api/Users`
    //    and regardless of success or failure, the form should reset
    axios.post('http://myapi.com/api/Users', newUser)
      .then(res =>{
        setUsers([res.data, ...users])
      })
      .catch(err =>{
        console.log(err)
      })
      setFormValues(initialFormValues)
  }

  return (
    <div className="App">
      Hi from App
      <Form 
      values={formValues}
      submit={formSubmit}
      change={inputChange}
      disabled={disabled}
      errors={formErrors}
      />
    </div>
  );
}

export default App;
