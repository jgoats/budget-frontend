App Description : A budget app user interface that allows users to create as many budgets as needed. Budgets can be viewed , created , and deleted.
url : https://justinssoftware.com/Budget
How I Built The App : The applications uses two forms of authentication: json web tokens and username/password. I utilized protected routes by building a component called
PrivateRoute that renders a conponent if the json web token is stored in the state. If not, the user is redirected to the landing page. Once signed in, the app performs a get request
that dynamically creates budget cards based on the user data thats inside the database. Chart.js was used to create graphs with the users data. Each component has access to the json web token and the current user. I utilized hash routing
instead of browser routing in order to fix 404 and 500 errors when the user refreshed the page. If the page is refreshed, the user is redirected to the landing page and is logged out
of the application. The json web token is stored inside the local memory/state and is not stored in local storage or a cookie. Javascript can access both cookies (except for http cookies)
and local storage which is not ideal for security.
