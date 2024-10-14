const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');

// AppError class used to wrap errors always in the same object
const AppError = require('./utils/app-error');

// TODO error handler
const globalErrorHandler = require('./controllers/error-controller');

// TODO routes
// const routeName = require('routePath');

const app = express();

// CSP of Helmet
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      // eventually add some other src if needed
      //
      // 'script-src': [
      //   "'self'",
      //   'https://unpkg.com',
      //   'https://js.stripe.com/v3/'
      // ],
      // 'img-src': ["'self'", 'data:', 'https://*.tile.openstreetmap.org'],
      // 'connect-src': [
      //   "'self'",
      //   'http://localhost:3000',
      //   'ws://localhost:*',
      //   'wss://natours-ef.onrender.com:1234/'
      // ],
      // 'frame-src': ['https://js.stripe.com/']
    }
  })
);

// dev logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// limit requests per user
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour'
});
app.use('/api', limiter);

// body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// data sanitization against no sql query injection
app.use(mongoSanitize());

// data sanitization againts xss
app.use(xss());

// prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      // eventually add permitted url parameters if needed in apis
      // 'duration',
      // 'ratingsAverage',
      // 'ratingsQuantity',
      // 'maxGroupSize',
      // 'difficulty',
      // 'price'
    ]
  })
);

app.use(compression());

// test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// TODO links to routes
// app.use('/', viewRouter);
// app.use('/api/v1/tours', tourRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
