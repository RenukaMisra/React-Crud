import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

export default function MediaCard({ data, onEdit, onDelete }) {
  return (
    data.map((item) => (
      <Card
        key={item.id}
        sx={{
          maxWidth: 300,
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          margin: 2,
          padding: 2,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
              height: '48px',
              fontSize: '18px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {item.title}
          </Typography>

          <Box display="flex" justifyContent="center" my={2}>
            <img
              src={item.image}
              alt={item.title}
              style={{ width: '100px', height: "100px", objectFit: 'contain' }}
            />
          </Box>

          <Typography variant="subtitle1" color="textSecondary">
            {item.category}
          </Typography>

          <Typography variant="h6" color="green">
            ${item.price}
          </Typography>
        </CardContent>

        <Box my={1}>
          <Link to={`/product/view/${item.id}`} style={{ textDecoration: 'none' }}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              fullWidth
              sx={{ marginBottom: 1 }}
            >
              View Product
            </Button>
          </Link>
        </Box>

        <CardActions sx={{ justifyContent: 'center', gap: 1 }}>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => onDelete(item.id)}
          >
            Delete
          </Button>

          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => onEdit(item)}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    ))
  );
}
