import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import Login from './components/Login';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useNavigate
} from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import Id from './components/Task/Id';

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    user: {
                        merge(existing, incoming) {
                            return { ...existing, ...incoming };
                            // this part of code is depends what you actually need to do, in my
                            //case i had to save my incoming data as single object in cache
                        }
                    }
                }
            }
        }
    })
});
const userLogin = localStorage.getItem('user');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={userLogin ? <App /> : <Navigate to="/login" />}
                    ></Route>
                    <Route
                        path="/login"
                        element={userLogin ? <Navigate to="/" /> : <Login />}
                    ></Route>
                    <Route path="task">
                        <Route path=":id" element={<Id />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
