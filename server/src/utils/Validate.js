import validator from 'validator'

export const validate = (data)=>{
   try {
      if(!data)
        throw new Error('Data not present')

        const {emailId, password, contact} = data

        if(!validator.isEmail(emailId))
            throw new Error('Invalid Email')

        if(!validator.isStrongPassword(password))
            throw new Error('Weak password')

        if(!validator.isMobilePhone(contact))
            throw new Error('Invalid phone number')

        return {success : true}        
   } catch (error) {
        return {success: false, message: error.message}
   }

}