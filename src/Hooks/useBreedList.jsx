import { useQuery } from "@tanstack/react-query"
import fetchBreedList from "../Fetch/fetchBreedList.jsx"

const useBreedList = (animal) => {
  const { data, status } = useQuery({queryKey: ["breeds", animal], queryFn: fetchBreedList})
  return [ data?.breeds ?? [] , status ]
}
export default useBreedList;