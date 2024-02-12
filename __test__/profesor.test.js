const request = require("supertest")
const app = require("../index")
const agent = request.agent(app)

afterAll(done=>{
  app.close();
  done();
})

describe("POST /materias/ingresar-materia",()=>{
  it("deberia retornar de forma exitosa si se ha creado las materias", async () => {
    const response = await agent.post("/materias/ingresar-materia").type('json').send({nombre:"Biología"});
    expect(response.status).toBe(200);
    expect(response.body.materias).toEqual([{nombre:"Biología"}])
    const response2 = await agent.post("/materias/ingresar-materia").type('json').send({nombre:"Matemáticas"});
    expect(response2.status).toBe(200);
    expect(response2.body.materias).toEqual([{nombre:"Biología"},{nombre:"Matemáticas"}])
  })
})

describe("POST /profesores/ingresar-profesor",()=>{
  it("deberia retornar de forma exitosa si se ha creado el profesor y las materias que imparte", async () => {
    const response = await agent.post("/profesores/ingresar-profesor").type('json').send({nombre:"Antonio",cedula:"40287492",materias:[0,1]});
    expect(response.status).toBe(200);
    expect(response.body.profesores).toEqual([{nombre:"Antonio",cedula:"40287492"}])
    expect(response.body.materias).toEqual([0,1])
  })
})

describe("GET /profesores/mostrar-profesores-materia",()=>{
  it("deberia retornar de forma exitosa los profesores con sus respectivas materias", async () => {
    const response = await agent.get("/profesores/mostrar-profesores-materia").type('json');
    expect(response.status).toBe(200);
    expect(response.body.profesorMateria).toEqual([{nombreProfesor:"Antonio",nombreMateria:"Biología"},{nombreProfesor:"Antonio",nombreMateria:"Matemáticas"}])
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
    const response = await agent.post("/eventos/ingresar-evento").type('json').send({claseId:0,fecha:"2024-03-19T12:00:00-04:00",tipo:0});
    expect(response.status).toBe(200);
    expect(response.body.eventos).toEqual([{claseId:0,fecha:"2024-02-12T12:00:00-04:00",tipo:0},{claseId:0,fecha:"2024-02-13T12:00:00-04:00",tipo:0},{claseId:0,fecha:"2024-03-19T12:00:00-04:00",tipo:0}]);
  })
})

describe("GET /profesores/mostrar-proximos-eventos",()=>{
  it("deberia retornar de forma exitosa los profesores con sus respectivas materias", async () => {
    const response = await agent.get("/profesores/mostrar-proximos-eventos/0").set('Accept', 'application/json').type('json');
    expect(response.status).toBe(200);
    expect(response.body.profesoresProximosEventos).toEqual({"Antonio":[{claseId:0,fecha:"2024-02-12T12:00:00-04:00",tipo:0},{claseId:0,fecha:"2024-02-13T12:00:00-04:00",tipo:0}]})
  })
})

describe("DELETE /profesores/eliminar-profesor-materia/:id",()=>{
  it("deberia eliminar la materia del profesor", async () => {
    const response = await agent.delete("/profesores/eliminar-profesor-materia/0").type('json').send({matId:1});
    expect(response.status).toBe(200);
    expect(response.body.clases).toEqual([{profId:0,matId:0,secId:null}])
  })
})
