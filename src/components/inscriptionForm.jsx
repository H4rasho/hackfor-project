import { FormControl, FormLabel ,Select, Heading,   OrderedList, ListItem, Box} from "@chakra-ui/react";

export default function InsciprtionForm() {
  return (
    <>
      <Box paddingY={8}>
      <Heading size="md">Reglas</Heading>
      <OrderedList mt={4}>
        <ListItem>Crear una base de datos en el backend y programar la interfaz de usuario en el frontend.</ListItem>
        <ListItem>Trabajar solo o en grupos de tres, utilizando cualquier tecnología preferida.</ListItem>
        <ListItem>Mostrar los proyectos el 28 de febrero en una llamada en vivo.</ListItem>
        <ListItem>Cargar los proyectos en un repositorio con el código, los miembros del equipo y la URL con el despliegue de la aplicación.</ListItem>
        <ListItem>El nivel de complejidad del proyecto es libre.</ListItem>
        <ListItem>El ganador recibirá un premio.</ListItem>
        <ListItem>Si no tienes un compañero de equipo, puedes buscar uno a través del canal.</ListItem>
        </OrderedList>
    </Box>
    <form>
    <FormControl>
    <FormLabel>Equipo</FormLabel>
      <Select>
        <option value='option1' >Solo</option>
        <option value='option2'>Buscame un Equipo</option>
      </Select>
    </FormControl>
    </form>
    </>
  );
}
