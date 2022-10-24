describe('Blog App', function(){

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset').then(response => {
            expect(response.status).to.eq(204)
        })
        const user = {
            name: 'Chan',
            username: 'root',
            password: 'rootblah'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user).then(response => {
            expect(response.status).to.eq(201)
        })
        cy.visit('http://localhost:3000')
    })

    it('front page opens', function(){
        cy.contains('Username')
        cy.contains('Password')
    })

    describe('Login', function() {

        it('user can login successful with correct credentials', function(){
            cy.get('#username').type('root')
            cy.get('#password').type('rootblah')
            cy.get('#loginButton').click()
            cy.contains('Chan is logged in')
        })

        it('fails with wrong credentials', function(){
            cy.get('#username').type('root')
            cy.get('#password').type('root')
            cy.get('#loginButton').click()
            cy.contains('Wrong credentials')
        })

    })

    describe.only('When logged in', function(){
        beforeEach(function(){
            cy.login({ username: 'root', password: 'rootblah' })
        })

        it('new blog can be created', function(){
            cy.contains('Add Blog').click()
            cy.get('input.title').type('test')
            cy.get('input.author').type('test')
            cy.get('input.url').type('test.com')
            cy.contains('Create').click()
            cy.contains('test')
        })

        describe('interacting with blog', function(){
            it('user can like a blog', function(){
                cy.createBlog({ title: 'test', author: 'test', url: 'test.com' })
                cy.contains('View').click()
                cy.contains('Like').click()
                cy.get('.likes').should('contain', 1)
            })

            it('user can delete blog', function(){
                cy.createBlog({ title: 'test 1', author: 'test', url: 'test.com', likes: 0 })
                cy.contains('View').click()
                cy.contains('Remove').click()
                cy.visit('http://localhost:3000')
                cy.get('.blog').should('not.exist')
            })

            it('blogs are ordered by likes', function(){
                cy.createBlog({ title: 'test 1', author: 'test', url: 'test.com', likes: 0 })
                cy.createBlog({ title: 'test 2', author: 'test', url: 'test.com', likes: 5 })
                cy.createBlog({ title: 'test 3', author: 'test', url: 'test.com', likes: 3 })
                cy.get('.blog').eq(0).should('contain','test 1')
                cy.get('.blog').eq(1).should('contain','test 3')
                cy.get('.blog').eq(2).should('contain','test 2')
            })
        })
    })
})