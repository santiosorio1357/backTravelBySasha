// Librería nativa de nodejs para manipular archivos FileSystem
const fs = require('fs');


class FileProvider {

    constructor() {

    }

    /**
     * Método para leer un archivo
     * @param {*} path Ruta del archivo
     * @returns Buffer del archivo
     */
    readFile(path) {
        const buffer = fs.readFileSync(path)
        return buffer
    }

    /**
     * Método para guardar un archivo
     * @param {*} path 
     * @param {*} data 
     */
    saveFile(path, data){
        fs.writeFileSync(path, data)
    }

}

module.exports = FileProvider
