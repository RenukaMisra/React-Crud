import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function MediaCard({data,onEdit}) {

  const [prod, setProd] = useState([])

  // console.log(data, 'data from props')

  useEffect(() => {
    if (data && data.length > 0) {
      setProd(data);
    }
  }, [data]);

  const handledelete = (id) => {
    console.log("button clicked", id);
    fetch(`https://fakestoreapi.com/carts/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        const updatedList = prod.filter(item => item.id !== id);
        setProd(updatedList);
      })
      .catch(error => {
        console.log("delete failed", error);
      });
  };





  return (

    prod.map((item, id) => {



      return (
        <Card key={item.id} sx={{ maxWidth: 345, display: "flex", flexDirection: "column", textAlign: "center" }}>
          <div style={{ border: '1px solid #b0a5a540' }}>
            <CardContent>
              <Typography gutterBottom variant="h6" component="div" overflow='hidden' textOverflow='ellipsis' maxWidth='216px' height='48px' fontSize='18px' display='-webkit-box' webkit-line-clamp='2' webkit-box-orient='vertical' >
                {item.title}
              </Typography>

              <img src={item.image} style={{ width: '100px', height: "100px", objectFit: 'contain' }}></img>
              <CardContent>

                <Typography gutterBottom variant="h5" component="div">
                  {item.category}
                </Typography>

                <Typography gutterBottom variant="h5" component="div" color='green'>
                  ${item.price}
                </Typography>
               
              </CardContent>
            </CardContent>
          </div>
          <Link to={`/product/view/${item.id}`}>
            <Button style={{ backgroundColor: "blue", color: "white" }} size="big">View Product</Button>
          </Link>
          <CardActions sx={{ justifyContent: 'center' }}>
            <Button
              style={{ backgroundColor: "red", color: "white", padding: "10px 14px", width: "160px" }}
              size="small"
              onClick={() => handledelete(item.id)}
            >Delete
            </Button>

            <Button style={{ backgroundColor: "green", color: "white", padding: "10px 14px", width: "160px" }} size="small" onClick={() => onEdit(item)}>Edit</Button>
          </CardActions>
        </Card>
      )
    })

  );
}
