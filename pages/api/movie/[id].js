import connectDb from "../../../lib/dbConnect"
import Movie from "../../../models/Movie"

export default async function handler(req, res) {

  await connectDb()

  // GET api/movie/:id  (OBTENER UN ID Y LISTARLO)

  const {method, query: {id}} = req
  switch (method) {
    case 'GET':
      try {
        const movie = await Movie.findById(id).lean()
        if(!movie){
          return res.status(404).json({sucess: false})
        }
        
        return res.json({success: true, data: movie})

      }
      catch(error) {
        return res
          .status(400)
          .json({success: false, error: "Falla del servidor"})
      
      }
    
    case 'DELETE':
      try {
        const movie = await Movie.findByIdAndDelete(id)
        if(!movie){
          return res.status(404).json({sucess: false})
        }
        
        return res.json({success: true, data: movie})

      }
      catch(error) {
        return res
          .status(400)
          .json({success: false, error: "Falla del servidor"})
      
      }

    case 'PUT':
      try {
        const movie = await Movie.findByIdAndUpdate(
          id, 
          req.body,
          {
            new: true,
            runValidators: true
          }
          )
        if(!movie){
          return res.status(404).json({sucess: false, error})
        }
        
        return res.json({success: true, data: movie})

      }
      catch(error) {
        return res
          .status(400)
          .json({success: false, error: "Falla del servidor"})
      
      }

    default:
      return res.status(400).json({success: false, error: 'Falla del servidor'})
  }
}