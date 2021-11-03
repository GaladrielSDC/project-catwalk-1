import React, { useContext, useState, useEffect, useRef } from 'react';
import ProductContext from '../../../context/products/ProductContext';

import leftArrow from '../../../../assets/backArrow.svg';
import rightArrow from '../../../../assets/forwardArrow.svg';
import upArrow from '../../../../assets/upArrow.svg';
import downArrow from '../../../../assets/downArrow.svg';

import './product-expanded-view.styles.scss';

const ProductExpandedView = ({ expandView }) => {
  const productContext = useContext(ProductContext);
  const { currentStyle } = productContext;
  const [page, setPage] = useState(0);
  const [height, setHeight] = useState(0);
  const ref = useRef(null);


  const handleClick = (e) => {
    const currentIndex = Number(e.target.name);
    setPage(currentIndex);
  }

  const handlePageChange = (e) => {
    if (e.target.name === "back") {
      if (page === 0) {
        // setPage(length);
        setPage(currentStyle.photos.length - 1)
      } else {
        setPage(page - 1)
      }
    } else {
      if (page === currentStyle.photos.length - 1) {
        setPage(0)
      } else {
        setPage(page + 1)
      }
    }
  }

  const handleLoad = () => {
    if (ref.current.clientHeight) {
      setHeight(ref.current.clientHeight)
    }
  }

  const handleScroll = (height) => {
    ref.current.scrollTop -= height
  }

    if (!currentStyle.photos) {
      return <p>Loading...</p>
    } else {
    return (
      <div className="expanded-view-container">


        <div className="expanded-view-gallery-main">
                    <img src={leftArrow} className="left-arrow" onClick={handlePageChange} name="back" value={page}/>
                    {currentStyle.photos.map((photo, index) => {
                      if (page === index) {
                        return (
                          <img className="expanded-view-main" src={photo.url} onClick={expandView}/>
                        )
                      }
                    })}
                    <img src={rightArrow} className="right-arrow" onClick={handlePageChange} name="front" value={page}/>
          </div>

        <div className="expanded-view-thumbnail-container" >
          <div className="expanded-view-thumbnail-display" ref={ref} onLoad={handleLoad}>
            {currentStyle.photos && currentStyle.photos.map((photo, index, key) => (
              <div key={index}>
                <img src={photo.thumbnail_url} className={ page === index ? "expanded-view-thumbnail active" : "expanded-view-thumbnail" } onClick={handleClick} name={index} />
              </div>
            ))}
          </div>
        </div>

      </div>
    )};
}

export default ProductExpandedView