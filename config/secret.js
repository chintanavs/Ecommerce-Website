module.exports={
  database:'mongodb://root:c28015599@ds217351.mlab.com:17351/ecommerce',
  port:3000,
  secretKey:'cavs123',

  facebook:{
    clientID: process.env.FACEBOOK_ID || '232543527545468',
    clientSecret:process.env.FACEBOOK_SECRET || 'ce1a470362e208f0fb1ae9ac065dffa8',
    profileFields:['emails','displayName'],
    callbackURL:'http://localhost:3000/auth/facebook/callback'
  }

}
