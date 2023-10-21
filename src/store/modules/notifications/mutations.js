export default {
  setNotification:(state,notification)=>state.notifications.push(notification),
  removeNotifications:(state)=>state.notifications=[]
}
