import React, { useState, useEffect } from 'react'  
import axios from 'axios';  
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';  

function CreateProduct(props) {  

  const [product, setProduct] = useState({ name: '', category: '', description: '', price: 0.00 , imageFile: '' });  
  const [showLoading, setShowLoading] = useState(false);  
  const apiUrl = "http://127.0.0.1:8000/api/products/";  
  
  const InsertProduct = (e) => {  
    e.preventDefault();  
    // debugger;  
    
    const data = { name: product.name, category: product.category, description: product.description, imageFile: product.imageFile, price: product.price };  
    
    let formData = new FormData();

    for ( var key in data ) {
      formData.append(key, data[key]);
    }

    //req api call 
    axios.post(apiUrl, formData)  
      .then((result) => {  
        props.history.push('/ProductList')  
      });  
  };  

  const onChange = (e) => {  
    e.persist();  
    // debugger;  
    if(e.target.name == 'imageFile') {
      let files = e.target.files || e.dataTransfer.files;
      setProduct({...product, [e.target.name]: files[0]});  
      console.log(product, files[0])
    } else {
      setProduct({...product, [e.target.name]: e.target.value});  
    }
    
  }  
  
  return (  
    <div className="app flex-row align-items-center">  
      <Container>  
        <Row className="justify-content-center">  
          <Col md="12" lg="10" xl="8">  
            <Card className="mx-4">  
              <CardBody className="p-4">  
                <Form onSubmit={InsertProduct}>  
                  <h1>Create Product</h1>  
                  <InputGroup className="mb-3">  
                    <Input type="text" name="name" id="name" placeholder="name" value={product.name} onChange={ onChange }  />  
                  </InputGroup>  
                   <InputGroup className="mb-3">  
                    <Input type="text" placeholder="category" name="category" id="category" value={product.category} onChange={ onChange }/>  
                  </InputGroup>  
                  <InputGroup className="mb-3">  
                    <Input type="text" placeholder="description" name="description" id="description"  value={product.description} onChange={ onChange }  />  
                  </InputGroup>  
                  <InputGroup className="mb-4">  
                    <Input type="file" name="imageFile" id="image" onChange={ onChange }  />
                  </InputGroup>  
                  <InputGroup className="mb-4">  
                    <Input type="text" placeholder="price" name="price" id="price" value={product.price} onChange={ onChange } />  
                  </InputGroup>  
             <CardFooter className="p-4">  
                <Row>  
                  <Col xs="12" sm="6">  
                    <Button type="submit" className="btn btn-info mb-1" block><span>Save</span></Button>  
                  </Col>  
                  <Col xs="12" sm="6">  
                    <Button className="btn btn-info mb-1" block><span>Cancel</span></Button>  
                  </Col>  
                </Row>  
              </CardFooter>  
                </Form>  
              </CardBody>  
            </Card>  
          </Col>  
        </Row>  
      </Container>  
    </div>  
  )  
}  

export default CreateProduct 