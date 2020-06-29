import React from 'react'
import { Carousel } from 'antd';

function ImageSlider(props) {
    return (
        <div>

            <Carousel autoplay>
                {props.images.map((image, index) => (
                    <div key={index}>
                        <img style={{ width: '100%',height:'150px', maxHeight: '150px' }}
                            src={`https://localhost:8080/${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider