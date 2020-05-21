const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');

const catchAsync = require('../utils/catchAsync');
const appError = require('../utils/appError');

exports.getOverview = catchAsync(async(req,res) => {
    // 1.Get tour data from collection 
    const tours = await Tour.find()

    // 2.Build template

    // 3.Render that templates using tour data from collection
    res.status(200).render('overview', {
        title: 'All Tours',
        tours
    })
})

exports.getTour = catchAsync(async(req,res,next) => {
    // Get the data, for the request tour (including reviews and guides)
    const tour = await Tour.findOne({slug: req.params.slug}).populate({
        path: 'reviews',
        model: 'Review',
        select: 'review rating user'
    })
    if(!tour) return next(new appError('No tour found with that slug',404))
    // Build the template

    // Send the response to the client
    res.status(200).render('tour', {
        title: tour.name,
        tour
    })
});

exports.login = catchAsync(async(req,res) => {
    res.status(200).render('login',{
        title:  'Log into your account'
    })
})
exports.getAccount = (req,res) => {
     res.status(200).render('account',{
         title: 'Your account'
     })
}
exports.updateUserData  = catchAsync(async(req,res,next) => {
  const user = await User.findByIdAndUpdate(req.user.id,{
      name: req.body.name,
      email: req.body.email
  },{
    new: true,
    runValidators: true
    })
    res.status(200).render('account',{
        title: 'your account',
        user
    })  
})

exports.getMyTours = catchAsync(async(req,res,next) => {
    const bookings = await Booking.find({ user: req.user.id});

    const tourIDs = bookings.map(el => el.tour);
    const tours = await Tour.find({ _id: {$in: tourIDs} });
    res.status(200).render('overview', {
        title: 'My Tours',
        tours
    })
})