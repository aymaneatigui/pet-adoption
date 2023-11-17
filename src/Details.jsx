import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./Fetch/fetchPet";
import Carousel from "./Carousel.jsx";
import Modal from "./modal.jsx";
import { useDispatch } from "react-redux";
import { adopt } from "./adoptedPetSlice.js"

const Details = () => {
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, status } = useQuery({
    queryKey: ["pets", id],
    queryFn: fetchPet,
  });
  const dispatch = useDispatch();

  if (status == "pending") {
    return (
      <div className='loading-pane'>
        <h2 className='loader'>🌀</h2>
      </div>
    );
  }

  if (status == "error") {
    return <div className='Error'>THIS IS ERROR</div>;
  }

  return (
    <div className='details'>
      {data.pets.map((pet, id) => {
        return (
          <div key={id}>
            <Carousel images={pet.images} />
            <h1>{pet.name}</h1>
            <h2>
              {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
              <button onClick={() => setShowModal(true)}>
                Adopt {pet.name}
              </button>
            </h2>
            {showModal ? (
              <Modal>
                <div>
                  <h1>Would you like to adapte {pet.name}?</h1>
                  <div className='buttons'>
                    <button
                      onClick={() => {
                        dispatch(adopt(pet));
                        navigate("/");
                      }}
                    >
                      Yes
                    </button>
                    <button onClick={() => setShowModal(false)}>No</button>
                  </div>
                </div>
              </Modal>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default Details;
