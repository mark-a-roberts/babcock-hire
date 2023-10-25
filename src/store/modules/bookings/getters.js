export default {
  getBookings:(state)=>state.bookings,
  // bookings between dates
  between: (state)=>(from, to)=>state.bookings.filter((b)=>{
    const bookDate = {
      from: new Date(b.from),
      to: new Date(b.to)
    }
    return (bookDate.from <=to && bookDate.to >= from)
  }),
  vehicle:(state, getters)=>(vid, start, end) => {
    const bookings = start ? getters.between(start, end) : state.bookings;
    return (bookings.filter( (b) => (b.vehicle_id === vid)))
  }
}