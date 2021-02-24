import React from 'react'

function Form(props) {
    const { //props from App
      values,
      submit,
      change,
      disabled,
      errors,
    } = props
  
    const onSubmit = evt => { //prevent refresh default, invoke submit function
      evt.preventDefault()
      submit()
    }
  
    const onChange = evt => { 
      const { name, value, type, checked } = evt.target
      const valueToUse = type === 'checkbox' ? checked : value //if type checkbox, use valuetouse, otherwise use value
      change(name, valueToUse)
    }
  
    return (
      <form className='form container' onSubmit={onSubmit}>
        <div className='submit'>
  
          <div className='errors'>
            <div>{errors.name}</div>
            <div>{errors.email}</div>
            <div>{errors.password}</div>
            <div>{errors.tos}</div>
          </div>
        </div>
  
        <div className='inputs'>
          <h3>Add User</h3>
  
          <label>Name
            <input
              value={values.name}
              onChange={onChange}
              name='name'
              type='text'
            />
          </label>
  
          <label>Email
            <input
              value={values.email}
              onChange={onChange}
              name='email'
              type='text'
            />
          </label>

          <label>Password
            <input
              value={values.password}
              onChange={onChange}
              name= 'password'
              type='text'
            />
          </label>
  

        </div>
  
        <div className='checkboxes'>
  
          <label>Terms of Service
            <input 
              type='checkbox'
              name='tos'
              onChange={onChange}
              checked={values.tos} 
            />
          </label>
  
        </div>

        <button disabled = {disabled}>Submit</button>
      
      </form>
    )
  }
  

export default Form;