export default {
  getTypes:(state)=>state.types,
  byCode:(state)=>(code)=>(state.types.find((s)=>(s.code === code)))
}