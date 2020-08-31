import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';  
import ProductList from './ProductList'
import CreateProduct from './CreateProduct'

function Example() {
    return (
        <div className="App">
            <Router>
                <div className="container">
                    <nav className="btn btn-warning navbar navbar-expand-lg navheader">
                        <div className="collapse navbar-collapse" >
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link to={'/CreateProduct'} className="nav-link">Add Product</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/ProductList'} className="nav-link">Product List</Link>
                                </li>
                            </ul>
                        </div>
                    </nav> <br />
                    <Switch>
                        <Route exact path='/CreateProduct' component={CreateProduct} />
                        {/* <Route path='/edit/:id' component={Editemployee} /> */}
                        <Route path='/ProductList' component={ProductList} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default Example;

if (document.getElementById('product')) {
    ReactDOM.render(<Example />, document.getElementById('product'));
}
