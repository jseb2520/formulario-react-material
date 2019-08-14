import React, { useState } from "react";
import "./App.css";
import logo from "./logo.svg";

//Material Components
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core/";

//Material Helpers
import { makeStyles } from "@material-ui/core/styles";

//Custom styling for some components
const useStyles = makeStyles(theme => ({
  textField: {
    marginTop: theme.spacing(5),
    alignContent: "center"
  },
  button: {
    position: "relative",
    color: "#282c34"
  },
  list: {
    flexDirection: "column",
    display: "flex",
    alignItems: "center",
    justifyItems: "center"
  },
  listItems: {
    flexDirection: "column",
    width: "50%"
  }
}));

const App = () => {
  //hooks to manage state variables
  const [openModal, setOpenModal] = useState(false);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [codigo, setCodigo] = useState("");
  // eslint-disable-next-line
  const [datosGuardados, setDatosGuardados] = useState([]);

  //using custom styling
  const classes = useStyles();

  //modal dialog control
  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  //handles and assigns the input text of textFields to state variables
  const handleOnChange = e => {
    //const regExp = /^[0-9\b]+$/;
    if (e.target.name === "nombre") {
      setNombre(e.target.value);
    } else if (e.target.name === "apellido") {
      setApellido(e.target.value);
    } else {
      setCodigo(e.target.value);
    }
  };

  //pushes new object with user's input into datosGuardados array
  const onSave = () => {
    if (nombre !== "" && apellido !== "" && codigo !== "") {
      datosGuardados.push({
        nombre: nombre,
        apellido: apellido,
        codigo: codigo
      });
      //closes the modal dialog
      toggleModal();
    }
  };

  //elements to be shown on render
  return (
    <div>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button
          variant="contained"
          className={classes.button}
          onClick={() => !openModal && toggleModal()}
        >
          Abrir formulario
          {openModal ? (
            <Dialog open={openModal} onClose={toggleModal} >
              <DialogTitle>Formulario con React y Material-UI</DialogTitle>
              <DialogContent dividers={true}>
                <FormControl fullWidth>
                  <TextField
                    required
                    className={classes.textField}
                    variant="outlined"
                    name="nombre"
                    label="Nombre"
                    helperText="Ingrese su nombre"
                    onChange={handleOnChange}
                  />
                  <TextField
                    required
                    className={classes.textField}
                    variant="outlined"
                    name="apellido"
                    label="Apellido"
                    helperText="Ingrese su apellido"
                    onChange={handleOnChange}
                  />
                  <TextField
                    required
                    type="number"
                    className={classes.textField}
                    variant="outlined"
                    name="codigo"
                    label="Código"
                    helperText="Ingrese su código de estudiante"
                    onChange={handleOnChange}
                  />
                </FormControl>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={onSave}>
                  Guardar
                </Button>
                <Button onClick={() => openModal && toggleModal()}>
                  Cancelar
                </Button>
              </DialogActions>
            </Dialog>
          ) : null}
        </Button>
      </div>
      <div>
        <List className={classes.list}>
          <h2>Datos Guardados:</h2>
          {datosGuardados.map((item, index) => (
            <ListItem className={classes.listItems} button selected key={index}>
              <ListItemText
                primary={`${item.nombre} ${item.apellido} - Código: ${
                  item.codigo
                }`}
              />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};

export default App;
