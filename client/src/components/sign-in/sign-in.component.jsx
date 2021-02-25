import React, { useState } from 'react'

import './sign-in.styles.scss'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { auth, signInWithGoogle } from '../../firebase/firebase.utils'

function SignIn() {

  const [userCredentials, setUserCredentials] = useState(
    {
      email: '',
      password: ''
    }
  )

  const { email, password } = userCredentials

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await auth.signInWithEmailAndPassword(email, password)
      setUserCredentials({ email: '', password: '' })
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (event) => {
    const { value, name } = event.target
    setUserCredentials({ ...userCredentials, [name]: value })
  }

  return (
    <div className='sign-in'>
      <h2 className='title'>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          id='email'
          name='email'
          type='email'
          value={email}
          handleChange={handleChange}
          label='email'
          required
        />
        <FormInput
          id='password'
          name='password'
          type='password'
          value={password}
          handleChange={handleChange}
          label='password'
          required
        />
        <div className='buttons'>
          <CustomButton type='submit'>Sign In</CustomButton>
          <CustomButton type='button' onClick={signInWithGoogle} isGoogleSignIn>
            Sign In With Google
          </CustomButton>
        </div>
      </form>
    </div>
  )
}

export default SignIn