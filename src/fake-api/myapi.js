// This is for the fake API. Do not delete!
import { v4 as uuid } from 'uuid'

const initialUserList = [
  {
    id: uuid(), // uuid is a lib to generate random, unique ids
  }
]

export default {
  get() {
    return Promise.resolve({ status: 200, success: true, data: initialUserList })
  },
  post(url, { name, email, password, tos }) {
    const newUser = { id: uuid(), name, email, password, tos }
    return Promise.resolve({ status: 200, success: true, data: newUser })
  }
}