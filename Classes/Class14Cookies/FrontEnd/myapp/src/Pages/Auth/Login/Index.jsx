

import { TextField, Button, Typography, Stack } from "@mui/material";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { BASE_URL } from "../../../UTILS/utility";

const Login= () => {
  
  const {handleSubmit , control } = useForm()
  const handleLogin = async(obj) => {
     console.log("Obj :" , obj);

     const response = await axios.post(`${BASE_URL}/login`)
     console.log(response);    
  }

  return (
   
   <Stack component='form'
    onSubmit={handleSubmit(handleLogin)}
   >
    <Controller
       control={control}
        name="email"
       render={({
             field,
             formState : {errors},
         }) => (
       <TextField
          label="Email"
          variant="outlined"
          {...field}
       />
       )}
    />

    <Controller
       control={control}
        name="password"
       render={({
             field,
             formState : {errors},
         }) => (
       <TextField
          label="Password"
          variant="outlined"
          {...field}
       />
       )}
    />

    <Button type="submit">Log In</Button>
   </Stack>
    
  );
};

export default Login;

