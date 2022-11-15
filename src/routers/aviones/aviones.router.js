// Importar el framework
const express = require("express");

const {
  getDocuments,
  insertDocument,
  getDocumentById,
  deleteDocumentById,
  updateDocumentById,
} = require("../../controllers/MongoDb");
const Avion = require("../../models/Avion");
const { middlewareToken } = require("../../middleware/jwt.middleware");
// Crear una instancia del router
const router = express.Router();

router.post("/aviones", async (req, res) => {
  try {
    const avionObject = req.body;
    const avion = new Avion(avionObject);
    const responseDb = await insertDocument("sasha", "aviones", avion);
    res.send({
      ok: true,
      message: "1",
      info: responseDb,
    });
  } catch (error) {
    if (Object.keys(error).length > 0) {
      res.status(500).send(error);
    } else {
      res.status(500).send({
        ok: true,
        message: "2",
        info: error.toString(),
      });
    }
  }
});

router.get("/aviones", middlewareToken, async (req, res) => {
  try {
    const responseDb = await getDocuments("sasha", "aviones");

    res.send({
      ok: true,
      message: "aviones consultados",
      info: responseDb,
    });
  } catch (error) {
    const message = "Ha ocurrido un error en la consulta de aviones.";
    res.status(500).send({
      ok: false,
      message,
      info: error.toString(),
    });
  }
});

router.get("/aviones/:id", middlewareToken, async (req, res) => {
  try {
    const id = req.params.id;
    const responseDb = await getDocumentById("sasha", "aviones", id);

    res.send({
      ok: true,
      message: "Avion consultado",
      info: responseDb,
    });
  } catch (error) {
    const message = "Ha ocurrido un error consultando el Avion.";
    res.status(500).send({
      ok: false,
      message,
      info: error.toString(),
    });
  }
});

router.put("/aviones/:id", middlewareToken, async (req, res) => {
  try {
    const id = req.params.id;
    const avionObject = req.body;
    const avion = new Avion(avionObject);

    const responseDb = await updateDocumentById("sasha", "aviones", {
      id,
      data: avion,
    });
    if (responseDb.modifiedCount > 0) {
      return res.status(200).send({
        ok: true,
        message: "Avion actualizado.",
        info: avionObject,
      });
    } else {
      res.status(404).send({
        ok: false,
        message: "El Avion no existe.",
        info: "",
      });
    }
  } catch (error) {
    const message = "Ha ocurrido un error modificando el Avion.";
    res.status(500).send({
      ok: false,
      message,
      info: error.toString(),
    });
  }
});

router.delete("/aviones/:id", middlewareToken, async (req, res) => {
  try {
    const id = req.params.id;
    const responseDb = await deleteDocumentById("sasha", "aviones", id);
    if (responseDb.deletedCount === 1) {
      res.status(200).send({
        ok: true,
        message: "Avion eliminado",
        info: "",
      });
    } else {
      res.status(404).send({
        ok: false,
        message: "El Avion no existe.",
        info: responseDb,
      });
    }
  } catch (error) {
    const message = "Ha ocurrido un error eliminando el Avion.";
    res.status(500).send({
      ok: false,
      message,
      info: error.toString(),
    });
  }
});

module.exports = router;
