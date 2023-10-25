export default {
  getVehicles:(state)=>state.vehicles,
  byId:(state)=>(id)=>state.vehicles.find( (s)=>(s.id === id))
}