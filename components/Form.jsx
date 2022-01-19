import Link from "next/link";
import { Typography, Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";

const Form = ({formData, forNewMovie = true}) => {

  const router = useRouter()

  const [form, setForm] = useState({
    title: formData.title,
    plot: formData.plot
  })

  const handleChange = (e) => {
    const {value, name} = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(forNewMovie){
      postData(form)
    }else{
      putData(form)
    }
    
  }

  const putData = async (form) => {

    const {id} = router.query

    try {
      const res = await fetch(`/api/movie/${id}`, {
        method: 'PUT',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(form)
      })

      const data = await res.json()
      console.log(data)

      if(data.success){
        router.push('/')
      }


    } catch (error) {
      console.log(error)
    }
  }

  const postData = async(form) =>{
    try {
      console.log(form)
      const res = await fetch('/api/movie', {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(form)
      })

      const data = await res.json()
      console.log(data)

      if(data.success){
        router.push('/')
      }


    } catch (error) {
      console.log(error)
    }
  } 

  return ( 
    <div>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit}
        sx={{
          display:'flex',
          flexDirection:'column',
          width: {
            lg: 800,
            md: 300
          },
          margin: '0 auto'
        }}
      >
        <TextField 
          label="Title"
          variant="outlined"
          name="title"
          required
          value={form.title}
          onChange={handleChange}
        />
        <TextField 
          label="Plot"
          variant="outlined"
          name="plot"
          required
          value={form.plot}
          onChange={handleChange}
        />
        <Button type="submit" variant="outlined">
          {forNewMovie ? 'Agregar' : 'Editar'}
        </Button>
        <Link href="/">
          <a>Volver</a>
        </Link>
      </Box>
    </div>
   );
}
 
export default Form;