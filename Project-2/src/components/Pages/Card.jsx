import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


export default function Card({ cardDatas }) {

  const [data, setData] = useState([])

  const fetchBreweries = (term) => {
    let apiUrl = 'https://api.openbrewerydb.org/v1/breweries';

    if (term) {
      apiUrl = `https://api.openbrewerydb.org/v1/breweries?by_name=${term}`;
    }

    fetch(apiUrl)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchBreweries(cardDatas);
  }, [cardDatas]);

  console.log(data)
  return (
    <div>
      <main>
        <div class="container py-4 mt-5">
          <div class="p-5 mb-4 bg-body-tertiary rounded-3">
            <div class="container-fluid py-5">
              <h1 class="display-5 fw-bold">Brewery</h1>
              <p class="col-md-8 fs-4">A brewery or brewing company is a business that makes and sells beer. </p>             
            </div>
          </div>

          {data.map((datas) => {
            return (
              <div class="row align-items-md-stretch" key={datas.id}>
                <div class="col-12 my-4">
                  <div class="h-100 p-5 text-bg-dark rounded-3">
                    <Link to={`/${datas.id}`} ><h2>{datas.name}</h2></Link>
                    <p>{datas.address_1}</p>
                    <p>{datas.phone}</p>
                    <p>{datas.website_url}</p>
                    <p>{datas.state},{datas.street}</p>
                  </div>
                </div>
              </div>
            )
          })}

          <footer class="pt-3 mt-4 text-body-secondary border-top">
            © 2023
          </footer>
        </div>
      </main>
    </div>
  )
}
