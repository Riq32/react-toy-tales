import React, { useState, useEffect} from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])

  useEffect(()=>{
    fetch("http://localhost:3001/toys")
    .then(r => {
        if (!r.ok) {throw new Error("failed to get listings") }
        return r.json()
      })
      .then(setToys)
      .catch(error => console.log(error.message))
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }
   // define function to add toy to state
  const addToy = newToy => setToys(previousToys => [...previousToys, newToy])

  // define function to delete a toy in state
  const deleteToy = deletedtoyId => 
    setToys(previousToys => 
    previousToys.filter(toy => toy.id !== deletedtoyId))
// function to update likes
    const updateToy = updatedToy => {
  setToys(prevToys =>
    prevToys.map(toy =>
      toy.id === updatedToy.id ? updatedToy : toy
    )
  );
};

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} deleteToy={deleteToy} updateToy={updateToy}/>
    </>
  );
}

export default App;