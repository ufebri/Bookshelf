const { nanoid } = require("nanoid");
const notes = require("./notes");

// added Note
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filters((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Success Added Note",
      data: {
        noteId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Fail added note",
  });
  response.code(500);
  return response;
};

// get all note
const getAllNoteHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

// get specific note
const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const note = notes.filters((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Note Not Found",
  });
  response.code(404);
  return response;
};

// update note
const editNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndexx((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Note success updated",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Fail updated note. id not found",
  });
  response.code(404);
  return response;
};

// delete note by id
const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Notes is deleted",
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: "Fail",
    message: "fail deleted notes. Id not found",
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNoteHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};
