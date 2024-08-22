//locallhost
PORT = 4000

check api video = productControler.js = 29:00

removed mongodb = usenewparse usecreateindex, etc = not supported for new version of mongodb

//DATABASE CONNECTION URI/URL
DB_URI = "mongodb://127.0.0.1:27017/Ecommerce"
Ecommerse = db name

//changes made to productController = deleteProduct

await product.remove() => await product.deleteOne()

===========Error Solved=======path is imported in error.js file automatically ========================
// error happenedafter youtube not defined during error handling (uncaught exception, mongodb error, Promise rejection error )
Warning: Accessing non-existent property 'path' of module exports inside circular dependency
(Use `node --trace-warnings ...` to show where the warning was created)
============Error Solved=======================

# =======================================

# ======SEARCH FILTER FEATURES===========

=======================================

==============QUERY AND QUERYSTR==============
file = apifeatures

query = http://localhost:4000/product?keyword=samosa OR anything after ?
queryStr = keyword

# =======================================

# ======Backend USER AND PASSWORD AUTHENTICATION===========

=======================================

=====NPM PACKAGES====

1. bcryptjs -- encrypt the password
2. jsonwebtoken -- genrate tokens
3. validator -- to validate fields(email,password,username)
4. nodemailer -- send mail link to reset password
5. cookieparser -- genrated token stored in cookie parser
6. body-parser

nodemailer 3:12:00
sendEmail.js
https://stackoverflow.com/questions/59188483/error-invalid-login-535-5-7-8-username-and-password-not-accepted

if modemailer does not work well then add-
host:"smtp.gmail.com",
port:465

//LOGIN
"email":"manoj@gmail.com",
"password":"111111111"

//============FRONTEND==========

import { BrowserRouter as Router, Route } from 'react-router-dom';
return (
<Router>

<Header />

      <Route exact path='/' Component={Home} />

      <Footer />
    </Router >

);
}

=====REPLACED WITH=======
===https://stackoverflow.com/questions/69832748/error-error-a-route-is-only-ever-to-be-used-as-the-child-of-routes-element====

import { BrowserRouter, Route, Routes } from 'react-router-dom';

    <BrowserRouter>
      <Header />
      <Routes>

        <Route exact path='/' Component={Home} />
      </Routes>



      <Footer />
    </BrowserRouter >

//connecting backend to ffrontend
"proxy":"http://192.168.1.100:4000"

# #=============react-alert error=========

- productController => get all product in first line
- add next as parameter
- return next(new ErrorHandler("this is my temp error"))

# #============useparams error===========

https://stackoverflow.com/questions/44318631/how-get-the-value-of-match-params-id-on-react-router

# productCount removed from productcontrooler.js (get product details )

# search: navigate used instead of history.push()

# cloudinary login: markpatil7620@gmail.com via google

# profile.js

- <img src={user.avatar && user.avatar.url} alt={user.name} />

# app.js /

loading is added to it before the return statement

if (loading) {
return <Loader />;
}

<Route/> is changed to

- {isAuthenticated && <Route exact path="/account" Component={Profile} />}

# backend/userController/forgot password/password reset token

- process.env.FRONTEND_URL=req.protocol}://${req.get("host")
  it will be changed at the time of deployment because at that time there will be only one port

  // const redirectTo = location.search && location.search.startsWith("?redirect=")
  // ? "/" + location.search.split("=")[1]
  // : "/account";

# STRIPE/PAYMENT.js

this one was for error called
[elements] is not a <route> component. all component children of <routes> must be a <route> or <react.fragment>

- {stripeApiKey && (
  <Route
  exact
  path="/process/payment"
  element={
  <Elements stripe={loadStripe(stripeApiKey)}>
  <Payment />
  </Elements>
  }
  />
  )}

  this was error saying that - no routes found /process/payment
  {/_ {stripeApiKey && (
  <Route
  exact
  path="/process/payment"
  element={
  <Elements stripe={loadStripe(stripeApiKey)}>
  <Payment />
  </Elements>
  }
  />
  )} _/}
