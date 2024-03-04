import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

const RatingStar = () => {
    const [rating, setRating] = useState(0) // initial rating value

    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)
        // Some logic
    }

    return (
        <div class="botonRating">
            <Rating
                onClick={handleRating}
                ratingValue={rating}
                size={40}
                label
                transition
                fillColor='#c40e61'
                emptyColor='#a692ff'
                borderColor='#a692ff' // Color de los bordes de las estrellas
                borderStyle='solid'
                borderWidth={5} // Ancho de los bordes de las estrellas
            />
            Calificar
        </div>
    )
}

export default RatingStar;
