
import React from 'react';

import '../sass/list.scss'
import '../sass/layout.scss'

import  Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import  Row from 'react-bootstrap/Row'
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card'
import Image from 'react-bootstrap/Image'

class List extends React.Component{ 
render(){
    let tweetss = this.props.tweet.map((twe,index) =>{
        return(
          <Col key={index} sm="12" className="cardcol" >
              <Card className="cardstyles" border="primary">
                <Card.Header className="cardhead">
                  <Image src={twe.Userimg} rounded />
                  <div className="userna">{twe.tweetUser}</div>
                </Card.Header>
                <Card.Body className="cardbody">
                <Card.Text>
                    {twe.symbolTweets}
                </Card.Text>
                </Card.Body>
            </Card>
          </Col>
        )
      })
      
      let syms = this.props.symss.map((item,index)=>{
        return (
      <div className="listgroup" key={index}>
                    <ListGroup>
                        <ListGroup.Item  
                        className="listitem" 
                        onClick={()=> {this.props.deleteItems(item)}}>
                        {item.value} ({item.tweetlen})
                        </ListGroup.Item>
                    </ListGroup>
      </div>
        )
      })
  
    return(
     <Container fluid className="conta">
             <Row>
                  <Col xs="9" className="tweecol" >
                    <div className="containerdiv">
                      <Container className="cardcon">
                        <Row>
                          {tweetss}
                      </Row>
                      </Container>
                    </div>
                  </Col>
                <Col xs="3" >
                  <div className="listdiv">
                    {syms}
                  </div>
                </Col>
              </Row>
     </Container>
    )
}
}


export default List;
