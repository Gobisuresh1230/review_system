import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

export default function Ratings() {

  const { id } = useParams();
  const [datas, setDatas] = useState(null);

  const [reviewData, setReviewData] = useState([])

  const [reviews, setReviews] = useState({
    id: id,
    ratings: '',
    description: ''
    
  })

  useEffect(() => {
    fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setDatas(data);
      })
      .catch((error) => console.error("Error fetching product details:", error));
  }, [id]);

  useEffect(() => {

    const apiUrl = `http://localhost:3002/${id}`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((res) => {
        setReviewData(res);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);

      });
  }, [id]);



  if (!datas) {
    return <div>Loading...</div>;
  }

  function handleSubmit(e) {
    axios.post('http://localhost:3002/reviews', reviews)
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))    
    // window.location.reload(false);
  }

  return (
    <div>
      <div className='d-flex px-5 mx-5 mt-5'>
        <Link to='/home' >
          <i class="fa-solid fa-arrow-left mx-3 mt-1 fa-2xl text-dark"></i>
        </Link>
      </div>
      <hr className='container' />
      <div class="container my-5">
        <div class="bg-body-tertiary p-5 rounded">
          <div class="col-sm-8 py-5 mx-auto">
            <h1 class="display-5 fw-normal">Name: {datas.name}</h1>
            <p class="fs-5">Type: {datas.brewery_type}</p>
            <p className='fs-5'>Address: {datas.address_1}</p>
            <p class="fs-5">City: {datas.city}</p>
            <p class="fs-5">State: {datas.state_province}</p>
            <p class="fs-5">Postal Code: {datas.postal_code}</p>
            <p class="fs-5">Country: {datas.country}</p>
            <p class="fs-5">Website: {datas.website_url}</p>
            <p class="fs-5">Street: {datas.street}</p>
            <p className="fs-5">
              Ratings: {reviewData.length > 0 ? (reviewData[0].rating || 'N/A') : ' '}
            </p>

            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Add Reviews</button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">New message</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div class="mb-3 col-8">
                        <label for="recipient-name" class="col-form-label  text-dark m-0 p-0">Rating:</label>
                        <input type="text" class="form-control" id="recipient-name" placeholder='0-5' onChange={(e) => setReviews({ ...reviews, ratings: e.target.value })} />
                      </div>
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label text-dark m-0 p-0">Description.:</label>
                        <textarea class="form-control" id="message-text" placeholder='reviews message' onChange={(e) => setReviews({ ...reviews, description: e.target.value })}></textarea>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary" >Add Review</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
