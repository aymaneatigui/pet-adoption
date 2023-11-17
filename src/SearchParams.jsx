import { useState } from "react";
import useBreedList from "./Hooks/useBreedList.jsx";
import Results from "./Results.jsx";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./Fetch/fetchSearch.jsx";
const animals = ["bird", "cat", "dog", "rabbit", "reptile"];
import { useSelector, useDispatch } from "react-redux";
import { all } from "./searchPramsSlice.js";

const SearchParams = () => {

  const dispatch = useDispatch()

  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const adoptePet = useSelector(state => state.adoptedPet.value)
  const params = useSelector(state => state.searchPrams.value)
  const { data } = useQuery({
    queryKey: ["pets", params],
    queryFn: fetchSearch,
  });
  const pets = data?.pets ?? [];

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            location: formData.get("location") ?? "",
            breed: formData.get("breed") ?? "",
          };
          dispatch(all(obj));
        }}
      >
        {adoptePet ? (
          <div className="pet image-container">
            <img src={adoptePet.images[0]} alt={adoptePet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="location" />
        </label>
        <label htmlFor="animal">
          Animals
          <select
            id="animal"
            name="animal"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {animals?.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select id="breed" name="breed" disabled={breeds.length === 0}>
            <option />
            {breeds?.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
