connection().then(async(outcome)=>{
  var bookings=(outcome);
  router.post('/train',(req,res)=>{
    const newentry={
        booking_id:req.body.booking_id
    }
    const found=bookings.some((bookings=>bookings.booking_id===newentry.booking_id))
    console.log(JSON.stringify(newentry));
    console.log(typeof(found))