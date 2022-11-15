// Importar el framework
const express = require("express");

const {
  getDocuments,
  insertDocument,
  getDocumentById,
  deleteDocumentById,
  updateDocumentById,
  getDocumentsWithFilter
} = require("../../controllers/MongoDb");
const Vuelos = require("../../models/Vuelo");
const { middlewareToken } = require("../../middleware/jwt.middleware");
// Crear una instancia del router
const router = express.Router();

router.post("/vuelos", async (req, res) => {
  try {
    const vuelosObject = req.body;
    const vuelos = new Vuelos(vuelosObject);
    const responseDb = await insertDocument("sasha", "vuelos", vuelos);
    res.send({
      ok: true,
      message: "Vuelo creado.",
      info: responseDb,
    });
  } catch (error) {
    if (Object.keys(error).length > 0) {
      res.status(500).send(error);
    } else {
      res.status(500).send({
        ok: true,
        message: "Vuelo NO creado.",
        info: error.toString(),
      });
    }
  }
});

router.get("/vuelos", middlewareToken, async (req, res) => {
  try {
    const responseDb = await getDocuments("sasha", "vuelos");

    res.send({
      ok: true,
      message: "vuelos consultados",
      info: responseDb,
    });
  } catch (error) {
    const message = "Ha ocurrido un error en la consulta de vuelos.";
    res.status(500).send({
      ok: false,
      message,
      info: error.toString(),
    });
  }
});

router.get("/vuelos/:id", middlewareToken, async (req, res) => {
  try {
    const id = req.params.id;
    const responseDb = await getDocumentById("sasha", "vuelos", id);

    res.send({
      ok: true,
      message: "Vuelo consultado",
      info: responseDb,
    });
  } catch (error) {
    const message = "Ha ocurrido un error consultando el Vuelo.";
    res.status(500).send({
      ok: false,
      message,
      info: error.toString(),
    });
  }
});
router.get("/vuelos/avion/:id", middlewareToken, async (req, res) => {
  try {
    const IdAvion = req.params.id;
    let vuelo = await getDocumentsWithFilter("sasha", "vuelos", {
      IdAvion
    });
    console.log(vuelo)
    res.send({
      ok: true,
      message: "Vuelo consultado",
      info: vuelo,
    });
  } catch (error) {
    const message = "Ha ocurrido un error consultando el Vuelo.";
    res.status(500).send({
      ok: false,
      message,
      info: error.toString(),
    });
  }
});
router.put("/vuelos/:id", middlewareToken, async (req, res) => {
  try {
    const id = req.params.id;
    const vueloObject = req.body;
    const vuelo = new Vuelos(vueloObject);

    const responseDb = await updateDocumentById("sasha", "vuelos", {
      id,
      data: vuelo,
    });
    if (responseDb.modifiedCount > 0) {
      return res.status(200).send({
        ok: true,
        message: "Vuelo actualizado.",
        info: vueloObject,
      });
    } else {
      res.status(404).send({
        ok: false,
        message: "El Vuelo no existe.",
        info: "",
      });
    }
  } catch (error) {
    const message = "Ha ocurrido un error modificando el Vuelo.";
    res.status(500).send({
      ok: false,
      message,
      info: error.toString(),
    });
  }
});

router.delete("/vuelos/:id", middlewareToken, async (req, res) => {
  try {
    const id = req.params.id;
    const responseDb = await deleteDocumentById("sasha", "vuelos", id);
    if (responseDb.deletedCount === 1) {
      res.status(200).send({
        ok: true,
        message: "Vuelo eliminado",
        info: "",
      });
    } else {
      res.status(404).send({
        ok: false,
        message: "El Vuelo no existe.",
        info: responseDb,
      });
    }
  } catch (error) {
    const message = "Ha ocurrido un error eliminando el Vuelo.";
    res.status(500).send({
      ok: false,
      message,
      info: error.toString(),
    });
  }
});

module.exports = router;
