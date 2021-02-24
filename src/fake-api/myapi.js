import { v4 as uuid } from 'uuid' //uuid gives us unique key ids

export const initialUsers = [ //this user will be on the page at start
    {
      id: uuid(),
      name:'Dave Grohl',
      email:'freshcoffee@email.com',
      password:'hunter2',
      tos: true
    },
  ]

export default {
  get() {
    return Promise.resolve({ status: 200, success: true, data: initialUsers })
  },
  post(url, { name, email, password}) {
    const newUser = { id: uuid(), name, email, password}
    return Promise.resolve({ status: 200, success: true, data: newUser })
  }
}