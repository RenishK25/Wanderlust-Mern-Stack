export default function Comment({reviews , listId}) {

  return (
    <>
    <hr />
            <p> <b>All Reviews</b> </p>

            <div className="row">
              {reviews.map((review, idx) => (
                <div key={idx} className="col-5 ms-3 mb-3">
                  <div className="card">
                      <div className="card-body review-body">
                          <div className="card-title">{review.author?.username}</div>
                          <div className="card-text"><p className="starability-result" data-rating={review.rating}></p></div>
                          <div className="card-text">{review.comment}</div>
                          <form className="mb-2" method="post" action={"/list/"+listId+"/review/"+review._id+"?_method=DELETE"}>
                              <button className="btn btn-dark">Delete</button>
                          </form>
                      </div>
                  </div>
                </div>
              )) 
              }
            </div>
    </>
  )
}
