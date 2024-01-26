class Resenas():

    def __init__(self,  contenido, fecha, idpelicula=None, idusuario=None) -> None:
            self.contenido = contenido
            self.fecha= fecha
            self.idpelicula = idpelicula
            self.idusuario = idusuario

class Resenas_nueva():

    def __init__(self,  contenido, fecha) -> None:
            self.contenido = contenido
            self.fecha= fecha