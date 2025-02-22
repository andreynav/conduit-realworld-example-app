import 'cypress-plugin-api'
import { setItemToLS } from '../../../support/utils'

class LoginAPI {
  userRegister(name, email, password) {
    return cy
      .api({
        method: 'POST',
        url: `http://localhost:3000/api/users`,
        body: {
          user: {
            username: name,
            email: email,
            password: password
          }
        }
      })
      .then((response) => {
        expect(response.status).to.equal(201)
      })
  }

  userLogin(email, password) {
    return cy
      .api({
        method: 'POST',
        url: `http://localhost:3000/api/users/login`,
        body: {
          user: {
            email: email,
            password: password
          }
        },
        failOnStatusCode: false,
        alias: 'loginUser'
      })
      .then((response) => {
        expect(response.status).to.equal(200)

        const loggedUser = {
          headers: {
            Authorization: `Token ${response.body.user.token}`
          },
          isAuth: true,
          loggedUser: response.body.user
        }

        setItemToLS('loggedUser', loggedUser)
      })
  }
}

export const loginAPI = new LoginAPI()
