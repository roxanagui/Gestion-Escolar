const request = require("supertest")
const app = require("../index")
const agent = request.agent(app)

afterAll(done=>{
  app.close();
  done();
})


describe("POST /materias/ingresar-materia",()=>{
  it("deberia retornar de forma exitosa si se ha creado la materia", async () => {
    const response = await agent.post("/materias/ingresar-materia").type('json').send({nombre:"Biología"});
    expect(response.status).toBe(200);
    expect(response.body.materias).toEqual([{nombre:"Biología"}]);
  })
})

describe("PUT /materias/editar-materia",()=>{
  it("deberia retornar de forma exitosa si se ha creado la materia", async () => {
    const response = await agent.put("/materias/editar-materia/0").type('json').send({nombre:"Inglés"});
    expect(response.status).toBe(200);
    expect(response.body.materia).toEqual({nombre:"Inglés"});
  })
})

describe("POST /profesores/ingresar-profesor",()=>{
  it("deberia retornar de forma exitosa si se ha creado el profesor y las materias que imparte", async () => {
    const response = await agent.post("/profesores/ingresar-profesor").type('json').send({nombre:"Antonio",cedula:"40287492",materias:[0]});
    expect(response.status).toBe(200);
    expect(response.body.profesores).toEqual([{nombre:"Antonio",cedula:"40287492"}]);
    expect(response.body.materias).toEqual([0]);
  })
})

describe("POST /materias/ingresar-materia",()=>{
  it("deberia retornar de forma exitosa si se ha creado la materia", async () => {
    const response = await agent.post("/materias/ingresar-materia").type('json').send({nombre:"Paramilitar"});
    expect(response.status).toBe(200);
    expect(response.body.materias).toEqual([{nombre:"Inglés"},{nombre:"Paramilitar"}]);
  })
})

describe("PUT /materias/editar-materia-profesor/:matId/:profId", ()=>{
  it("deberia retornar de forma exitosa si se ha creado la materia", async () => {
    const response = await agent.put("/materias/editar-materia-profesor/0/0").type('json').send({nuevoProfId:0,nuevoMatId:1});
    expect(response.status).toBe(200);
    expect(response.body.clase).toEqual({profId:0,matId:1,secId:null});
  })
})

describe("POST /profesores/ingresar-profesor",()=>{
  it("deberia retornar de forma exitosa si se ha creado el profesor y las materias que imparte", async () => {
    const response = await agent.post("/profesores/ingresar-profesor").type('json').send({nombre:"Nicolas",cedula:"43085024",materias:[0]});
    expect(response.status).toBe(200);
    expect(response.body.profesores).toEqual([{nombre:"Antonio",cedula:"40287492"},{nombre:"Nicolas",cedula:"43085024"}]);
    expect(response.body.materias).toEqual([0]);
  })
})

describe("POST /eventos/ingresar-evento",()=>{
  it("deberia retornar de forma exitosa si se ha creado el evento", async () => {
    const response = await agent.post("/eventos/ingresar-evento").type('json').send({claseId:0,fecha:"2024-02-12T12:00:00-04:00",tipo:0});
    expect(response.status).toBe(200);
    expect(response.body.eventos).toEqual([{claseId:0,fecha:"2024-02-12T12:00:00-04:00",tipo:0}]);
  })
})

describe("POST /eventos/ingresar-evento",()=>{
  it("deberia retornar de forma exitosa si se ha creado el evento", async () => {
    const response = await agent.post("/eventos/ingresar-evento").type('json').send({claseId:0,fecha:"2024-02-13T12:00:00-04:00",tipo:0});
    expect(response.status).toBe(200);
    expect(response.body.eventos).toEqual([{claseId:0,fecha:"2024-02-12T12:00:00-04:00",tipo:0},{claseId:0,fecha:"2024-02-13T12:00:00-04:00",tipo:0}]);
  })
})

describe("POST /eventos/ingresar-evento",()=>{
  it("deberia retornar de forma exitosa si se ha creado el evento", async () => {
    const response = await agent.post("/eventos/ingresar-evento").type('json').send({claseId:0,fecha:"2024-02-19T12:00:00-04:00",tipo:0});
    expect(response.status).toBe(200);
    expect(response.body.eventos).toEqual([{claseId:0,fecha:"2024-02-12T12:00:00-04:00",tipo:0},{claseId:0,fecha:"2024-02-13T12:00:00-04:00",tipo:0},{claseId:0,fecha:"2024-02-19T12:00:00-04:00",tipo:0}]);
  })
})


describe("POST /eventos/ingresar-evento",()=>{
  it("deberia retornar de forma exitosa si se ha creado el evento", async () => {
    const response = await agent.post("/eventos/ingresar-evento").type('json').send({claseId:0,fecha:"2025-02-11T12:00:00-04:00",tipo:0});
    expect(response.status).toBe(200);
    expect(response.body.eventos).toEqual([{claseId:0,fecha:"2024-02-12T12:00:00-04:00",tipo:0},{claseId:0,fecha:"2024-02-13T12:00:00-04:00",tipo:0},{claseId:0,fecha:"2024-02-19T12:00:00-04:00",tipo:0},{claseId:0,fecha:"2025-02-11T12:00:00-04:00",tipo:0}]);
  })
})


describe("GET /materias/mostrar-eventos-por-semana/:id",()=>{
  it("deberia de devolver los eventos organizados primero por año y luego por semana", async () => {
    const response = await agent.get("/materias/mostrar-eventos-por-semana/0").set('Accept', 'application/json');
    expect(response.status).toBe(200);
    expect(response.body.eventosAnnoSemana).toEqual({"2024":{"7":[{claseId:0,fecha:"2024-02-12T12:00:00-04:00",tipo:0},{claseId:0,fecha:"2024-02-13T12:00:00-04:00",tipo:0}],"8":[{claseId:0,fecha:"2024-02-19T12:00:00-04:00",tipo:0}]},"2025":{"7":[{claseId:0,fecha:"2025-02-11T12:00:00-04:00",tipo:0}]}})
  })
})

