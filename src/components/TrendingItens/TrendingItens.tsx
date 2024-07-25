import React from 'react';
import { Row, Col, Card  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importe as imagens
import imagem1 from '../../img/nb.png';
import imagem2 from '../../img/nb.png';
import imagem3 from '../../img/nb.png';
import imagem4 from '../../img/nb.png';
import imagem5 from '../../img/nb.png';
import imagem6 from '../../img/nb.png';

function Alta() {
  return (
    <div className="pt-10">
      <Row className="row-cols-1 row-cols-md-6 g-12">
        <Col>
          <Card className="image-frame text-center">
            <div className="image-frame">
              <img src={imagem1} alt="Imagem 1" className="img-fluid" style={{ width: '300px', height: '230px' }} />
            </div>
            <Card.Body>
                  <Card.Text>SSSS</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
        <Card className="image-frame text-center">
          <div className="image-frame">
            <img src={imagem2} alt="Imagem 2" className="img-fluid" style={{ width: '300px', height: '230px' }} />
          </div>
          <Card.Body>
                  <Card.Text>SSSS</Card.Text>
            </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card className="image-frame text-center">
          <div className="image-frame">
            <img src={imagem3} alt="Imagem 3" className="img-fluid" style={{ width: '300px', height: '230px' }} />
          </div>
          <Card.Body>
                  <Card.Text>SSSS</Card.Text>
            </Card.Body>
        </Card>
        </Col>
        <Col>
        <Card className="image-frame text-center">
          <div className="image-frame">
            <img src={imagem4} alt="Imagem 4" className="img-fluid" style={{ width: '300px', height: '230px' }} />
          </div>
          <Card.Body>
                  <Card.Text>SSSS</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
        <Card className="image-frame text-center">
          <div className="image-frame">
            <img src={imagem5} alt="Imagem 5" className="img-fluid" style={{ width: '300px', height: '230px' }} />
          </div>
          <Card.Body>
                  <Card.Text>SSSS</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
        <Card className="image-frame text-center">
          <div className="image-frame">
            <img src={imagem6} alt="Imagem 6" className="img-fluid" style={{ width: '300px', height: '230px' }} />
          </div>
          <Card.Body>
                  <Card.Text>SSSS</Card.Text>
            </Card.Body>
        </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Alta;
