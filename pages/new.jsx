import {Typography} from "@mui/material"
import Form from "../components/Form";

const New = () => {

  const formData = {
    title: "",
    plot: ""
  }

  return ( 
    <div>
      <Typography variant="h2">
        Agregar Movie
      </Typography>
      <Form formData={formData}/>
    </div>
  );
}
 
export default New;