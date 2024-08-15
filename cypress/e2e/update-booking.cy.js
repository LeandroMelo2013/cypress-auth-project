/// <reference types="cypress"/>

describe('Update Booking', () => {

    var token = ''
    var bookingid = ''
   
    before('Login,', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/auth',
            body: {
                username: "admin",     
	            password: "password123"
            }
        })
        .then((response) => {
            expect(response.status).to.eql(200)
            token = response.body.token
        })
    } )

    beforeEach('Create Booking', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking',
            body: {     
                "firstname": "Leandro",     
                "lastname": "Melo",     
                "totalprice": 1000,     
                "depositpaid": true,     
                "bookingdates": {         
                "checkin": "2018-07-11",         
                "checkout": "2019-07-12"     
                },     
                "additionalneeds": "Breakfast" 
               }
        })
        .then((response) => {
            //console.log('Reserva criada: ' + response.body.bookingid)
            expect(response.status).to.eql(200)
            expect(response.body.bookingid).to.be.a('number')
            expect(response.body.booking.totalprice).to.eql(1000)
            bookingid = response.body.bookingid
        })
    })
    it('Update Booking', () => {
        cy.request({
            method: 'PUT',
            url: 'https://restful-booker.herokuapp.com/booking/' + bookingid,
            //failOnStatusCode: false, // Adicione isso para evitar falhar automaticamente
            body:{
                    "firstname": "Nome Alterado",     
                    "lastname": "Sobrenome Melo",     
                    "totalprice": 5000,     
                    "depositpaid": true,     
                    "bookingdates": {         
                    "checkin": "2024-08-12",         
                    "checkout": "2024-08-12"     
                    },     
                    "additionalneeds": "Breakfast" 
                  },
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Cookie': 'token=' +token
                  }

            
        })
        .then((response) => {
            expect(response.status).to.eql(200)
            expect(response.body.totalprice).to.eql(5000)
            expect(response.body.firstname).to.eql('Nome Alterado')
        })
    })
})