class Evento {
  constructor(tipo,claseId,fecha){
    this.tipo = tipo;
    this.claseId = claseId;
    this.fecha = fecha;
    const tipos = ['Evaluaci�n', 'Corte de nota', 'Encuentro', 'Video conferencia'];
  }
}
module.exports = Evento;
