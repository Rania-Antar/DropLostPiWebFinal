import React from 'react'
import PropTypes from 'prop-types'
// nodejs library that concatenates classes
// react component used to create nice image meadia player
import ImageGallery from 'react-image-gallery'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'

// core components

import GridItem from '../../../components/Grid/GridItem.jsx'

import productStyle from '../../../jss/material-kit-pro-react/views/productStyle.jsx'

// images
import  { useEffect, useState } from 'react'





function ObjectImageDetail (props) {
  
    const [Images, setImages] = useState([])

    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) {
            let images = [];

            props.detail.images && props.detail.images.map(item => {
                images.push({
                    original: `https://localhost:8080/${item}`,
                    thumbnail: `https://localhost:8080/${item}`
                })
            })
            setImages(images)
        }
    }, [props.detail])
  
 
    return (
     
              
                <GridItem md={6} sm={6}>
                  <ImageGallery
                    showFullscreenButton={true}
                    showPlayButton={false}
                    startIndex={3}
                    items={Images}
                  />
                </GridItem> 
                
     
    )
  }


ObjectImageDetail.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(productStyle)(ObjectImageDetail)
