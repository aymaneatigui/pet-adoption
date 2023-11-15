import { useContext, useState } from "react";
import useBreedList from "./Hooks/useBreedList.jsx";
import Results from "./Results.jsx";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./Fetch/fetchSearch.jsx";
import AdoptePetContext from "./AdoptePetContext.jsx";

const animals = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [params, setParams] = useState({ location: "", animal: "", breed: "" });
  const [animal, setAnimal] = useState("");
  const [adoptePet] = useContext(AdoptePetContext);
  const [breeds] = useBreedList(animal);

  const { data } = useQuery({
    queryKey: ["pets", params],
    queryFn: fetchSearch,
  });
  const pets = data?.pets ?? [];

  return (
    <div className="mx-auto my-0 w-11/12 ">
      <form
        className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            location: formData.get("location") ?? "",
            breed: formData.get("breed") ?? "",
          };
          setParams(obj);
        }}
      >
        {adoptePet ? (
          <div className="pet image-container">
            <img src={adoptePet.images[0]} alt={adoptePet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            className="search-input"
            type="text"
            id="location"
            name="location"
            placeholder="location"
          />
        </label>
        <label htmlFor="animal">
          Animals
          <select
            className="search-input"
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
          <select
            className="search-input grayed-out-disabled"
            id="breed"
            name="breed"
            disabled={breeds.length === 0}
          >
            <option />
            {breeds?.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </label>
        <button className="color rounded border-none bg-orange-500 px-6 py-2 text-white hover:bg-orange-600">
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
