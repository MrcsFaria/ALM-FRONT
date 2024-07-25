import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import imagem1 from '../../img/qrcode.jpg';

function FramePag() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{paddingTop: "100px"}}>
            <div
                style={{
                    display:'flex',
                    flexDirection:'column',
                    width: '610px',
                    height: '600px',
                    borderRadius: '10px',
                    border: '1px solid #ccc',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    backgroundColor: 'rgb(217, 217, 217)', // Cinza usando RGB
                    justifyContent:'center',
                    alignItems:'center',
                }}
            >
            <a style={{fontSize:'36px', fontWeight:600}}>Pagamento</a>
            <img src={imagem1} style={{height:'500px', width:'500px', paddingTop:'50px'}}></img>
            
            </div>
        </div>
    )

}

export { FramePag };