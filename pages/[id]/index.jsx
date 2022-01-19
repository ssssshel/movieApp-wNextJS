import { Typography, Box, Card, CardContent, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";

import connectDb from "../../lib/dbConnect";
import Movie from "../../models/Movie";

const MoviePage = ({success, error, movie}) => {
  console.log(success)
  console.log(error)
  console.log(movie)

  const router = useRouter()

  if(!success){
    return (
      <Box
        sx={{
          margin: "0 auto"
        }}
      >
        <Typography variant="h3">
          {error}
        </Typography>
        <Typography variant="body2">
          <Link href="/">
            <a>Volver</a>
          </Link>
        </Typography>
      </Box>
    )
  }

  const deleteData = async(id) => {
    try {
      await fetch(`/api/movie/${id}`, {
        method: "DELETE" 
      })
      router.push("/")
    } catch (error) {
      console.log(error)
    }
  }

  return ( 
    <Box
      sx={{
        margin: "2rem 5rem"
      }}
    >
      <Typography variant="h2">Detalle de Movie</Typography>
      <Card>
        <CardContent>
          <Typography variant="h4">
            {movie.title}
          </Typography>
          <Typography variant="body1">
            {movie.plot}
          </Typography>
        </CardContent>
      </Card>
      <Button
        variant="contained"
        color="primary"
        sx={{
          mr: 5
        }}
      >
        <Link href="/">
          <a>Volver</a>
        </Link>
      </Button>
      <Button>
        <Link href={`${movie._id}/edit`}>
          <a>Editar</a>
        </Link>
      </Button>
      <Button variant="contained"
      color="error"
      onClick={() => deleteData(movie._id)}
      >
        Eliminar
      </Button>
    </Box>
   );
}

export async function getServerSideProps({params}){
  try {
    await connectDb()

    const movie = await Movie.findById(params.id).lean()

    if(!movie){
      return {props: {success: false, error: "Pelicula no encontrada"}}
    }

    console.log(movie)
    movie._id = `${movie._id}`
    return {props: {success: true, movie}}


  } catch (error) {
    console.log(error)
    return {props: {success: false, error: 'ID no válido'}}
  }
}
 
export default MoviePage;