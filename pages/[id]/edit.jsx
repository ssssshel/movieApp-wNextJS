import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import useSWR from "swr";
import Form from "../../components/Form";


// LA CONSTANTE FETCHER REALIZA LA SOLICITUD CON LA URL (QUE OBTIENE DEL PRIMER PARAMETRO DE useSWR) PARA OBTENER LA INFORMACIÓN DE ESTA Y FORMATEARLA A JSON
const fetcher = async (url) => {
  const res = await fetch(url)

  if(!res.ok){
    const error = new Error('Ha ocurrido un error mientras se solicitaba la información')
    error.info = await res.json()
    error.status = res.status
    throw error
  }

  const {data} = await res.json()  
  return data
}

const EditMovie = () => {
  
  const router = useRouter()
  const {id} = router.query
  
  const {data: movie, error } = useSWR(id ? `/api/movie/${id}` : null, fetcher)

  if(error){
    return (
      <div>
        Error
      </div>
    )
  }

  if(!movie){
    return (
      <div>
        <Typography variant="h3">
          Loading...
        </Typography>
      </div>
    )
  }

  const formData = {
    title: movie.title,
    plot: movie.plot
  }

  return ( 
    <div>
      <Typography variant="h2">
        Editar Movie
      </Typography>
      <Form
        forNewMovie={false}
        formData={formData}
      ></Form>
    </div>
   );
}
 
export default EditMovie;