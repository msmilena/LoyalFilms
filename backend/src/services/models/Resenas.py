class Resenas():

    def __init__(self,  contenido, fecha, idpelicula=None, idusuario=None, calificacion= None) -> None:
            self.contenido = contenido
            self.fecha= fecha
            self.idpelicula = idpelicula
            self.idusuario = idusuario
            self.calificacion = calificacion

class Resenas_nueva():

    def __init__(self,  contenido, fecha, calificacion) -> None:
            self.contenido = contenido
            self.fecha= fecha
            self.calificacion = calificacion