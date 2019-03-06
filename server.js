
let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let session = require('express-session')

//Moteur de templates

app.set('view engine', 'ejs')

//Middlewares

app.use('/assets', express.static('public'))

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())

app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false }
  }))

app.use(require('./middlewares/flash'))

//Routes

app.get('/', (request, response) => {

	console.log(request.session)

	response.render('pages/index')

})

app.post('/', (request, response) => {

    if (request.body.lastName === undefined || request.body.lastName === '' 
    && request.body.firstName === undefined || request.body.firstName === ''
    && request.body.adress === undefined || request.body.adress === ''
    && request.body.postalCode === undefined || request.body.postalCode === ''
    && request.body.city === undefined  || request.body.city === ''
    && request.body.birthDate === undefined 
    && request.body.availability === undefined){

		request.flash('error', "Vous n\'avez pas remplit tous les champs")
    response.redirect('/')
    
	} else {

        console.log(request.body.nom, request.body.prenom, request.body.disponibilite)
        request.flash('valid', "Votre compte à été crée")
        response.redirect('/')
        
	}
})

app.listen(8080)