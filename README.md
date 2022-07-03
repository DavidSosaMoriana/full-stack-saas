# full-stack-saas
![Screenshot_1](https://user-images.githubusercontent.com/79170707/177035874-7aeb7198-f6e8-40ae-87bb-6b97a0291b8b.jpg)

## Comandos

Escriban el comando npm run dev para el backend de la aplicación y npm start para el frontend.

### Dependencias
    @apollo/client,
    graphql,
    react,
    react-dom,
    react-icons,
    react-router-dom,
    react-scripts,
    web-vitals,

### Descripción
En la aplicación se pueden observar dos botones, "add worker" y "new project". Ambos actúan como formularios para añadir trabajadores (primero) y proyectos (segundo). 

Para los proyectos se podrá seleccionar su status con las opciones de "Not Started", "In Progress" y "Completed". 
También se podrá asignar dichos proyectos a los trabajadores anteriormente añadidos.

Al terminar estos procesos se pintará en pantalla una tarjeta con el nombre del proyecto,
su estado y un botón "view" donde se abrirá una nueva pantalla para poder editar los detalles del proyecto.

En cuanto al trabajador, se pintará una tabla con su nombre, email y localización.
Si se elimina desde esta pantalla al trabajador también será eliminado el proyecto al cual fue asignado.
