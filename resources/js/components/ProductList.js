import React from 'react'  
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';  
import axios from 'axios';  
import { useState, useEffect, Image } from 'react'  
import { jsPDF } from "jspdf";
import autoTable from 'jspdf-autotable'

function ProductList(props) {  

  const [data, setData] = useState([]);  
  
  useEffect(() => {  
    
    const GetData = async () => {  
      const result = await axios('http://127.0.0.1:8000/api/products');  
      setData(result.data);  
      
    };  

    GetData();  
    
  }, []);  


  // pdf function  
  var generateData = function(prodData) {
    
    var result = [];
    var data = prodData;
    
    console.log(data)
    
    for (var i = 0; i < data.length; i += 1) {
      data.id = (i + 1).toString();
      result.push(Object.assign({}, data));
    }
    
    return result;
  
  };
  
  // pdf function
  function createHeaders(keys) {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
      result.push({
        id: keys[i],
        name: keys[i],
        prompt: keys[i],
        width: 65,
        align: "center",
        padding: 0
      });
    }
    return result;
  }
  
  

  const deleteProduct = (id) => {  
    debugger;  
    axios.delete('http://127.0.0.1:8000/api/products?id=' + id)  
      .then((result) => {  
        props.history.push('/ProductList')  
    });  
  };  

  const editProduct = (id) => {  
    props.history.push({  
      pathname: '/products/' + id  
    });  
  };  

  // download pdf
  const downloadPDF = (data) => {  
     //
     // pdf
     var headers = createHeaders([
      "ID",
      "Name",
      "Category",
      "Description",
      "Image",
      "Price"
    ]);
    
    // var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
    // doc.table(1, 1, generateData(data), headers, { autoSize: true });
    // doc.save(`products.pdf`);
    var doc = new jsPDF()
    doc.autoTable({ html: '#table' })
    doc.save('table.pdf')
  };  
  
  return (  
    <div className="animated fadeIn">  
      <Row>  
        <Col>  
          <Card>  
            <CardHeader>  
              <i className="fa fa-align-justify"></i> Product List  
              <button className="btn btn-success" onClick={() => { downloadPDF(data) }}>Download PDF</button>  
                            
              </CardHeader>  
            <CardBody>  
              <Table hover bordered striped responsive size="sm" id="table">  
                <thead>  
                  <tr>  
                    <th>Name</th>  
                    <th>Category</th>  
                    <th>Description</th>  
                    <th>Image</th>  
                    <th>Price</th>  
                    <th colSpan="2"></th>
                  </tr>  
                </thead>  
                <tbody>  
                  {  
                    data.map((item, idx) => {  
                      return <tr key={idx}>  
                        <td>{item.name}</td>  
                        <td>{item.category}</td>  
                        <td>{item.description}</td>  
                        <td><img src={item.image} style={{ maxWidth: 100 }} /></td>  
                        <td>{item.price}</td>  
                        <td>  
                          <div className="btn-group">  
                            <button className="btn btn-warning" onClick={() => { editProudct(item.Id) }}>Edit</button>  
                            <button className="btn btn-warning" onClick={() => { deleteProduct(item.Id) }}>Delete</button>  
                          </div>  
                        </td>  
                      </tr>  
                    })}  
                </tbody>  
              </Table>  
            </CardBody>  
          </Card>  
        </Col>  
      </Row>  
    </div>  
  )  
}  
  
export default ProductList  
