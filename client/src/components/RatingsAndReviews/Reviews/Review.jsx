import React from 'react';
import Voter from '../../sharedComponents/Voter.jsx';
import StarRating from '../../sharedComponents/StarRating.jsx';
import PhotoTiles from './PhotoTiles.jsx';
import axios from 'axios';

const Review = (props) => {
  const {
    body,
    date,
    helpfulness,
    photos,
    rating,
    recommend,
    response,
    review_id,
    reviewer_name,
    summary } = props.review;

  let recommended, responseMessage;

  let formattedDate = new Date(date).toLocaleDateString(undefined,{month: 'long', day: 'numeric', year: 'numeric'});

  const wasHelpful = () => {
    const options = {
      url: 'http://localhost:3000/api/reviews/helpful/',
      method: 'PUT',
      params: {review_id}
    };
    // const url = 'http://localhost:3000/api/reviews/helpful/';
    // console.log(review_id);
    axios(options)
      .then(() => {
        console.log('Was helpful!');
      })
      .catch(err => {
        console.log(err);
      });
  };

    if (response) {
      responseMessage = (
        <div className = 'review-response'>
          {response}
        </div>
      );
    } else {
      responseMessage = null;
    }



    if (recommend) {
      recommended = (
        <div className = {'review-recomended-product'}>
        I recommend this product!
    </div>
      );
    }





  return (
    <li className = 'review'>

        <div className = {'review-rating-and-date'}>
          <div>
          <StarRating rating = {rating}/>
          </div>
          <div>
            {reviewer_name}, {formattedDate}
          </div>
        </div>
        <h3>{summary}</h3>
        <div className = {'review-body'}>
          <p>{body}</p>
        </div>
        {recommended}
        {responseMessage}
        <PhotoTiles photos = {photos}/>


        <Voter
        question = 'Was this review helpful?'
        helpfulness = {helpfulness}
        yes = {wasHelpful}
        report = {() => {console.log('ADD HTTP REQUEST')}}
        />

    </li>
  );
};

export default Review;