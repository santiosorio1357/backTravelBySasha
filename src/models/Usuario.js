const { createHash } = require("../controllers/bcrypt");

class Usuario {
  constructor({ IdUsuario, nombre, tipo, contraseña, correo, create_by }) {
    this.IdUsuario = IdUsuario;
    this.nombre = nombre;
    this.tipo = tipo;
    this.contraseña = contraseña;
    this.correo = correo;
    this.create_by = create_by;
  }

  initUser() {
    const contraseña = createHash(this.contraseña);
    return {
      IdUsuario: this.IdUsuario,
      nombre: this.nombre,
      tipo: this.tipo,
      correo: this.correo,
      create_by: this.create_by,
      contraseña,
    };
  }

  /**
   *
   * @param {Array} users Arreglo de usuarios
   * @returns Array de usuarios sin password
   */
  static removePassword(users) {
    return users.map((user) => {
      // delete user.password
      return user;
    });
  }
}

module.exports = Usuario;
