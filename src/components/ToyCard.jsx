function ToyCard({ id, name, image, likes, deleteToy, updateToy}) {

  const handleDelete = () => {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE"
    })
      .then(r => {
        if (!r.ok) throw new Error("failed to delete");
        deleteToy(id);
      })
      .catch(error => console.log(error.message));
  };

  const handleLike = () => {
  fetch(`http://localhost:3001/toys/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      likes: likes + 1
    })
  })
    .then(r => {
      if (!r.ok) throw new Error("failed to like toy");
      return r.json();
    })
    .then(updatedToy => {
      updateToy(updatedToy);
    })
    .catch(err => console.log(err.message));
};

  return (
    <div className="card" data-testid="toy-card">
      <h2>{name}</h2>

      <img
        src={image || "https://via.placeholder.com/150"}
        alt={name}
        className="toy-avatar"
      />

      <p>{likes} Likes </p>

      <button onClick={handleLike} className="like-btn">Like {"<3"}</button>

      <button onClick={handleDelete} className="del-btn">
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;