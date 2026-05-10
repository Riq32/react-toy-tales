import React, { useState } from "react";

function ToyForm({ addToy }) {

  const [toyData, setToyData] = useState({
    name: "",
    image: ""
  });

  const handleSubmit = event => {
    event.preventDefault();

    const newToy = {
      ...toyData,
      likes: 0
    };

    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newToy)
    })
      .then(r => {
        if (!r.ok) throw new Error("failed to create toy");
        return r.json();
      })
      .then(createdToy => {
        addToy(createdToy);
        setToyData({
          name: "",
          image: ""
        });
      })
      .catch(error => console.log(error.message));
  };

  const handleChange = event => {
    setToyData(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="add-toy-form">
        <h3>Create a toy!</h3>

        <input
          type="text"
          name="name"
          placeholder="Enter a toy's name..."
          className="input-text"
          value={toyData.name}
          onChange={handleChange}
        />

        <br />

        <input
          type="text"
          name="image"
          placeholder="Enter a toy's image URL..."
          className="input-text"
          value={toyData.image}
          onChange={handleChange}
        />

        <br />

        <input
          type="submit"
          value="Create New Toy"
          className="submit"
        />
      </form>
    </div>
  );
}

export default ToyForm;